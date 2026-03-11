param(
  [string]$DumpPath
)

$ErrorActionPreference = 'Stop'

$backupUri = $env:MONGO_URI_BACKUP
if (-not $backupUri) { throw 'MONGO_URI_BACKUP must be set.' }

$root = if ($env:BACKUP_DIR) { $env:BACKUP_DIR } else { Join-Path $PSScriptRoot '..\..\backup_dumps' }
$root = (Resolve-Path $root).Path

if (-not $DumpPath) {
  $latest = Get-ChildItem -Directory -Path $root | Sort-Object Name -Descending | Select-Object -First 1
  if (-not $latest) { throw "No dumps found in $root" }
  $DumpPath = $latest.FullName
}

if (-not (Test-Path $DumpPath)) { throw "Dump path not found: $DumpPath" }

if (-not (Get-Command mongorestore -ErrorAction SilentlyContinue)) {
  throw 'mongorestore not found in PATH. Install MongoDB Database Tools.'
}

Write-Host "Restoring dump from $DumpPath to backup cluster"
& mongorestore --uri "$backupUri" --drop "$DumpPath"

Write-Host 'Restore complete.'
