$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $projectRoot
$env:PYTHONUTF8 = '1'
$blenderExe = 'C:\Program Files\Blender Foundation\Blender 5.2\blender.exe'
$pythonExe = 'C:\Users\BD\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $blenderExe -b 'БУДКА.blend' --python scripts/inspect-user-blend.py
if ($LASTEXITCODE -ne 0) { throw 'Source audit failed' }
& $blenderExe -b 'БУДКА.blend' --python scripts/blender/build-author-model.py
if ($LASTEXITCODE -ne 0) { throw 'Author geometry build failed' }
& $pythonExe scripts/draw-author-panels.py
if ($LASTEXITCODE -ne 0) { throw 'Author drawings build failed' }
node scripts/register-author-revision.mjs
if ($LASTEXITCODE -ne 0) { throw 'Current revision registration failed' }
node scripts/sync-knowledge.mjs
if ($LASTEXITCODE -ne 0) { throw 'Knowledge generation failed' }
node scripts/build-dashboard-08.mjs
if ($LASTEXITCODE -ne 0) { throw 'Dashboard documents generation failed' }
& "$projectRoot\.tools\graphify-venv\Scripts\graphify.exe" export html --graph graphify-out/graph.json
if ($LASTEXITCODE -ne 0) { throw 'Graphify HTML export failed' }
node scripts/verify-author-dashboard.mjs
if ($LASTEXITCODE -ne 0) { throw 'Author dashboard verification failed' }
node tests/knowledge.mjs
if ($LASTEXITCODE -ne 0) { throw 'Knowledge validation failed' }
node tests/validate.mjs
if ($LASTEXITCODE -ne 0) { throw 'Registry validation failed' }
Write-Host 'Revision 08 updated; author dimensions and geometry verified.'
