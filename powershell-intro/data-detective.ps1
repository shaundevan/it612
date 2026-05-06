# Data Detective: PowerShell's Object Pipeline — walkthrough script
# Shaun Devan

Write-Host "=== Setup check ==="
$PSVersionTable.PSVersion

Write-Host "`n=== Part 1: Discovering Commands ==="
Get-Command *Process* | Select-Object -First 5
Get-Command *Item*    | Select-Object -First 5
Get-Command *Content* | Select-Object -First 5

Write-Host "`n=== Get-Process | Get-Member (first few) ==="
Get-Process | Get-Member -MemberType Property | Select-Object -First 5

Write-Host "`n=== Task 1: Top 5 Processes by Memory ==="
Get-Process |
    Sort-Object WorkingSet64 -Descending |
    Select-Object -First 5 Name, @{N='MB';E={[math]::Round($_.WorkingSet64/1MB,1)}}

Write-Host "`n=== Task 2: Group Files by Extension ==="
Get-ChildItem -Recurse -File |
    Group-Object Extension |
    Sort-Object Count -Descending |
    Select-Object Count, Name -First 10

Write-Host "`n=== Task 3: Large, Recently Modified Files ==="
Get-ChildItem -Recurse -File |
    Where-Object { $_.Length -gt 1KB -and $_.LastWriteTime -gt (Get-Date).AddHours(-24) } |
    Sort-Object Length -Descending |
    Select-Object Name, @{N='KB';E={[math]::Round($_.Length/1KB,1)}}, LastWriteTime |
    Select-Object -First 10

Write-Host "`n=== Part 3: Structured Data ==="
@'
[ {"name": "Alice", "course": "CS101", "grade": 92, "semester": "Fall"},
  {"name": "Bob", "course": "CS101", "grade": 78, "semester": "Fall"},
  {"name": "Charlie", "course": "CS201", "grade": 88, "semester": "Fall"},
  {"name": "Alice", "course": "CS201", "grade": 95, "semester": "Fall"},
  {"name": "Diana", "course": "CS101", "grade": 65, "semester": "Spring"},
  {"name": "Bob", "course": "CS201", "grade": 82, "semester": "Spring"},
  {"name": "Eve", "course": "CS101", "grade": 91, "semester": "Spring"},
  {"name": "Charlie", "course": "CS101", "grade": 73, "semester": "Spring"},
  {"name": "Alice", "course": "CS301", "grade": 97, "semester": "Spring"},
  {"name": "Diana", "course": "CS201", "grade": 71, "semester": "Spring"},
  {"name": "Frank", "course": "CS101", "grade": 84, "semester": "Fall"},
  {"name": "Eve", "course": "CS201", "grade": 89, "semester": "Fall"}
]
'@ | Set-Content students.json

$students = Get-Content students.json | ConvertFrom-Json

Write-Host "`n=== Task 4: First record + dot access ==="
$students[0]
"First name: $($students[0].name), grade: $($students[0].grade)"

Write-Host "`n=== Task 5: Filter — grades above 90 ==="
$students | Where-Object { $_.grade -gt 90 } | Select-Object name, course, grade

Write-Host "`n=== Task 5: CS101 only ==="
$students | Where-Object { $_.course -eq "CS101" } | Select-Object name, grade

Write-Host "`n=== Task 6: Average grade per course ==="
$students | Group-Object course | ForEach-Object {
    [PSCustomObject]@{
        Course  = $_.Name
        Average = [math]::Round(($_.Group | Measure-Object grade -Average).Average, 1)
        Count   = $_.Count
    }
}

Write-Host "`n=== Task 6: GPA per student ==="
$students | Group-Object name | ForEach-Object {
    [PSCustomObject]@{
        Student = $_.Name
        GPA     = [math]::Round(($_.Group | Measure-Object grade -Average).Average, 1)
        Courses = $_.Count
    }
} | Sort-Object GPA -Descending

Write-Host "`n=== Task 7: Export grade report CSV ==="
$students |
    Select-Object name, course, grade, @{N='letter';E={
        if ($_.grade -ge 90) {'A'} elseif ($_.grade -ge 80) {'B'}
        elseif ($_.grade -ge 70) {'C'} else {'F'}
    }} |
    Export-Csv grades-report.csv -NoTypeInformation

Import-Csv grades-report.csv

Write-Host "`n=== Part 4: Web request as object ==="
$response = Invoke-RestMethod "https://api.github.com/repos/PowerShell/PowerShell"
"Stars:    $($response.stargazers_count)"
"Language: $($response.language)"
"Updated:  $($response.updated_at)"

Write-Host "`n=== Environment / system info ==="
Get-ChildItem Env: | Where-Object { $_.Name -like "*PATH*" } | Select-Object Name
[System.Environment]::OSVersion
"Processors: $([System.Environment]::ProcessorCount)"
