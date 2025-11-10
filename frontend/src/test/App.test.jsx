import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('Frontend Application', () => {
    it('should render without crashing', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        
        // Basic test to ensure app renders
        expect(document.body).toBeDefined();
    });

    it('should have environment variables configured', () => {
        // Verify Vite environment setup
        expect(import.meta.env).toBeDefined();
    });
});

describe('Basic React Functionality', () => {
    it('should support React rendering', () => {
        const { container } = render(
            <BrowserRouter>
                <div>Test Component</div>
            </BrowserRouter>
        );
        
        expect(container).toBeInTheDocument();
    });

    it('should render text content', () => {
        render(
            <BrowserRouter>
                <div>Hello World</div>
            </BrowserRouter>
        );
        
        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });
});

describe('Router Configuration', () => {
    it('should have BrowserRouter available', () => {
        const { container } = render(
            <BrowserRouter>
                <div>Router Test</div>
            </BrowserRouter>
        );
        
        expect(container).toBeTruthy();
    });
});

