from fastapi.testclient import TestClient

def test_register_and_login(client: TestClient):
    # Register
    response = client.post(
        "/auth/register",
        json={"email": "test@example.com", "password": "password123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data

    # Login
    response = client.post(
        "/auth/login",
        json={"email": "test@example.com", "password": "password123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    
    return data["access_token"]

def test_get_current_user(client: TestClient):
    token = test_register_and_login(client)
    
    response = client.get(
        "/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"

def test_update_user_profile(client: TestClient):
    token = test_register_and_login(client)
    
    update_data = {
        "full_name": "Test User",
        "bio": "This is a test bio",
        "avatar_url": "http://example.com/avatar.jpg"
    }
    
    response = client.put(
        "/auth/me",
        headers={"Authorization": f"Bearer {token}"},
        json=update_data
    )
    assert response.status_code == 200
    data = response.json()
    assert data["full_name"] == "Test User"
    assert data["bio"] == "This is a test bio"
    assert data["avatar_url"] == "http://example.com/avatar.jpg"
    
    # Verify persistence
    response = client.get(
        "/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["full_name"] == "Test User"
