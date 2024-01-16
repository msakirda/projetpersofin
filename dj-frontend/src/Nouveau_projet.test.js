import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Nouveau_projet from './Nouveau_projet';

// Mock the fetch function
jest.mock('node-fetch');

describe('Nouveau_projet component', () => {
  test('renders the component', () => {
    render(<Nouveau_projet />);
    
    // Add your assertions here
    // For example:
    expect(screen.getByText(/project name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of pages/i)).toBeInTheDocument();
  });

  test('handles the number of pages change', () => {
    render(<Nouveau_projet />);
    
    // Assuming the "Number of Pages" input has a testID attribute
    const numPagesInput = screen.getByTestId('number-of-pages-input');
    
    fireEvent.change(numPagesInput, { target: { value: '5' } });

    // Add assertions based on the expected behavior after the change
    // For example:
    expect(numPagesInput.value).toBe('5');
  });

  // Add more tests for other functionalities as needed
});
