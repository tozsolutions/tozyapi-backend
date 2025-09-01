import unittest
import json
import sys
import os

# Add the src directory to the path so we can import our modules
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))

from main import app

class TestTozyApiBackend(unittest.TestCase):
    
    def setUp(self):
        """Set up test client"""
        self.app = app
        self.app.config['TESTING'] = True
        self.client = self.app.test_client()
    
    def test_health_endpoint(self):
        """Test the health check endpoint"""
        response = self.client.get('/health')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertIn('status', data)
        self.assertEqual(data['status'], 'healthy')
        self.assertIn('openai_configured', data)
    
    def test_home_endpoint(self):
        """Test the main home endpoint"""
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertIn('message', data)
        self.assertIn('status', data)
        self.assertIn('version', data)
        self.assertEqual(data['status'], 'active')
    
    def test_luna_quick_responses(self):
        """Test the Luna quick responses endpoint"""
        response = self.client.get('/api/luna/quick-responses')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertIn('quick_responses', data)
        self.assertIsInstance(data['quick_responses'], list)
        self.assertGreater(len(data['quick_responses']), 0)
    
    def test_luna_chat_without_openai_key(self):
        """Test Luna chat endpoint without OpenAI key"""
        response = self.client.post('/api/luna/chat', 
                                  json={'message': 'Test message'},
                                  headers={'Content-Type': 'application/json'})
        
        # Should return 503 when OpenAI is not configured
        self.assertEqual(response.status_code, 503)
        
        data = json.loads(response.data)
        self.assertIn('error', data)
    
    def test_luna_chat_empty_message(self):
        """Test Luna chat endpoint with empty message"""
        response = self.client.post('/api/luna/chat', 
                                  json={'message': ''},
                                  headers={'Content-Type': 'application/json'})
        
        # Should return 503 first due to no OpenAI key, or 400 if OpenAI was configured
        self.assertIn(response.status_code, [400, 503])
        
        data = json.loads(response.data)
        self.assertIn('error', data)
    
    def test_luna_chat_invalid_json(self):
        """Test Luna chat endpoint with invalid JSON"""
        response = self.client.post('/api/luna/chat', 
                                  data='invalid json',
                                  headers={'Content-Type': 'application/json'})
        
        # Should return 503 first due to no OpenAI key, or 400 if OpenAI was configured  
        self.assertIn(response.status_code, [400, 503])
    
    def test_luna_product_info_valid(self):
        """Test Luna product info endpoint with valid product"""
        response = self.client.get('/api/luna/product-info/panjur')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertIn('name', data)
        self.assertIn('description', data)
        self.assertIn('features', data)
        self.assertIn('applications', data)
    
    def test_luna_product_info_invalid(self):
        """Test Luna product info endpoint with invalid product"""
        response = self.client.get('/api/luna/product-info/invalid-product')
        self.assertEqual(response.status_code, 404)
        
        data = json.loads(response.data)
        self.assertIn('error', data)

if __name__ == '__main__':
    unittest.main()