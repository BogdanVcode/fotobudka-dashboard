$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $projectRoot
$env:PYTHONUTF8 = '1'
$blenderExe = 'C:\Program Files\Blender Foundation\Blender 5.2\blender.exe'
$pythonExe = 'C:\Users\BD\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $blenderExe -b 'БУДКА.blend' --python scripts/inspect-user-blend-10.py
if ($LASTEXITCODE -ne 0) { throw 'Source audit failed' }
& $blenderExe -b 'БУДКА.blend' --python scripts/blender/build-author-model-10.py
if ($LASTEXITCODE -ne 0) { throw 'Author geometry build failed' }
node C:/Users/BD/.codex/plugins/cache/openai-primary-runtime/pdf/26.904.11930/skills/pdf/container_tools/mark_artifact_operation_started.mjs --operation-kind edit --expected-output-count 1 --output-format pdf
if ($LASTEXITCODE -ne 0) { throw 'PDF marker failed' }
& $pythonExe scripts/draw-author-panels-10.py
if ($LASTEXITCODE -ne 0) { throw 'Author drawings build failed' }
node scripts/build-budget-10.mjs
if ($LASTEXITCODE -ne 0) { throw 'Budget generation failed' }
node scripts/register-author-revision-10.mjs
if ($LASTEXITCODE -ne 0) { throw 'Current revision registration failed' }
node scripts/sync-knowledge.mjs
if ($LASTEXITCODE -ne 0) { throw 'Knowledge generation failed' }
node scripts/build-dashboard-10.mjs
if ($LASTEXITCODE -ne 0) { throw 'Dashboard documents generation failed' }
& "$projectRoot\.tools\graphify-venv\Scripts\graphify.exe" export html --graph graphify-out/graph.json
if ($LASTEXITCODE -ne 0) { throw 'Graphify HTML export failed' }
node scripts/verify-author-10.mjs
if ($LASTEXITCODE -ne 0) { throw 'Author dashboard verification failed' }
node tests/knowledge.mjs
if ($LASTEXITCODE -ne 0) { throw 'Knowledge validation failed' }
node tests/validate.mjs
if ($LASTEXITCODE -ne 0) { throw 'Registry validation failed' }
Write-Host 'Revision 10 updated; author dimensions and geometry verified.'
