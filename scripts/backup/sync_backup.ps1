param(
  [string]$OutputDir
)

$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$backupScript = Join-Path $scriptDir 'backup_primary.ps1'
$restoreScript = Join-Path $scriptDir 'restore_to_backup.ps1'

$backupArgs = @()
if ($OutputDir) { $backupArgs += @('-OutputDir', $OutputDir) }

Write-Host 'Starting backup + restore sync...'

$dumpPath = & $backupScript @backupArgs | Select-String -Pattern 'Backup complete:' | ForEach-Object { $_.ToString().Split(':',2)[1].Trim() }

if (-not $dumpPath) {
  $root = if ($env:BACKUP_DIR) { $env:BACKUP_DIR } else { Join-Path $scriptDir '..\..\backup_dumps' }
  $latest = Get-ChildItem -Directory -Path $root | Sort-Object Name -Descending | Select-Object -First 1
  if (-not $latest) { throw "No dumps found in $root" }
  $dumpPath = $latest.FullName
}

& $restoreScript -DumpPath $dumpPath

Write-Host 'Sync complete.'
