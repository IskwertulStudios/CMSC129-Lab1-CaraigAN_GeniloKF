param(
  [string]$OutputDir
)

$ErrorActionPreference = 'Stop'

$mongoUri = $env:MONGO_URI_PRIMARY
if (-not $mongoUri) { $mongoUri = $env:MONGO_URI }
if (-not $mongoUri) { throw 'MONGO_URI_PRIMARY or MONGO_URI must be set.' }

$root = if ($OutputDir) { $OutputDir } elseif ($env:BACKUP_DIR) { $env:BACKUP_DIR } else { Join-Path $PSScriptRoot '..\..\backup_dumps' }
$root = (Resolve-Path $root).Path

if (-not (Get-Command mongodump -ErrorAction SilentlyContinue)) {
  throw 'mongodump not found in PATH. Install MongoDB Database Tools.'
}

$timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$dumpPath = Join-Path $root $timestamp

New-Item -ItemType Directory -Force -Path $dumpPath | Out-Null

Write-Host "Dumping primary cluster to $dumpPath"
& mongodump --uri "$mongoUri" --out "$dumpPath"

Write-Host "Backup complete: $dumpPath"
