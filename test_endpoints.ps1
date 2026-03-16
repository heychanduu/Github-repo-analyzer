$ErrorActionPreference = "Stop"

function Test-Endpoint {
    param($Method, $Url, $Headers = @{}, $Body = $null)
    Write-Host "Testing $Method $Url"
    try {
        $params = @{
            Method      = $Method
            Uri         = $Url
            Headers     = $Headers
            ContentType = "application/json"
        }
        if ($Body) { $params.Body = $Body }
        
        $response = Invoke-RestMethod @params
        Write-Host "Success!" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "Failed: $_" -ForegroundColor Red
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            Write-Host "Response Body: $($reader.ReadToEnd())" -ForegroundColor Yellow
        }
        return $null
    }
}

# 1. Register
$registerBody = @{
    email    = "test@example.com"
    password = "password123"
} | ConvertTo-Json
$registerResponse = Test-Endpoint -Method POST -Url "http://localhost:8080/api/auth/register" -Body $registerBody

if ($registerResponse) {
    $token = $registerResponse.token
    Write-Host "Got JWT Token: $token" -ForegroundColor Cyan
    
    $authHeader = @{ Authorization = "Bearer $token" }

    # 2. Access Protected Endpoint
    Test-Endpoint -Method GET -Url "http://localhost:8080/api/demo" -Headers $authHeader

    # 3. GitHub Proxy (Using 'octocat' as example)
    Test-Endpoint -Method GET -Url "http://localhost:8080/api/github/users/octocat" -Headers $authHeader

    # 4. Debug Endpoint (Postman Echo)
    Test-Endpoint -Method GET -Url "http://localhost:8080/api/github/debug" -Headers $authHeader
}
