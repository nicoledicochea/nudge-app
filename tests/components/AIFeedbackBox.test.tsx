import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AIFeedbackBox } from '../../src/components/AIFeedbackBox';

describe('AIFeedbackBox', () => {
  it('renders AI feedback with sparkle icon', () => {
    const feedback = { feedback: 'Looks like a balanced meal! Consider adding more vegetables next time.' };
    render(<AIFeedbackBox feedback={feedback} isLoading={false} />);
    
    expect(screen.getByText('AI Suggestion')).toBeInTheDocument();
    expect(screen.getByText(feedback.feedback)).toBeInTheDocument();
  });

  it('shows loading state when isLoading is true', () => {
    render(<AIFeedbackBox feedback={null} isLoading={true} />);
    
    expect(screen.getByText('AI Suggestion')).toBeInTheDocument();
    expect(screen.getByText('Generating feedback...')).toBeInTheDocument();
  });

  it('displays default empty state message', () => {
    const defaultMessage = { feedback: 'Add some portion blocks to your plate to get personalized feedback!' };
    render(<AIFeedbackBox feedback={defaultMessage} isLoading={false} />);
    
    expect(screen.getByText(defaultMessage.feedback)).toBeInTheDocument();
  });

  it('shows error message when feedback fails', () => {
    const errorMessage = { feedback: 'Feedback not available right now. Apologies for the inconvenience.' };
    render(<AIFeedbackBox feedback={errorMessage} isLoading={false} />);
    
    expect(screen.getByText(errorMessage.feedback)).toBeInTheDocument();
  });

  it('has proper styling with teal background', () => {
    render(<AIFeedbackBox feedback={{ feedback: 'Test feedback' }} isLoading={false} />);
    
    const feedbackBox = screen.getByTestId('ai-feedback-box');
    expect(feedbackBox).toHaveClass('ai-feedback-box');
  });
});
