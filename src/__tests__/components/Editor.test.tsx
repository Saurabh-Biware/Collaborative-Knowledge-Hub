import { render, screen } from '@testing-library/react';
import { Editor } from '@/components/Editor';

describe('Editor', () => {
  it('renders editor component', () => {
    const mockOnChange = jest.fn();
    render(<Editor content="" onChange={mockOnChange} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
