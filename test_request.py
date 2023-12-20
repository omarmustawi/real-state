import requests

# Replace 'your_token_here' with the actual token value
headers = {'Authorization': 'Token your_token_here'}

# Example GET request
# response = requests.get('https://your-api-endpoint.com/property/1/', headers=headers)
# print(response.json())

# Example DELETE request
response = requests.delete('https://your-api-endpoint.com/property/1/', headers=headers)
print(response.status_code)
