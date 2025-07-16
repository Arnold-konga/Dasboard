import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import Reviews from '../src/components/Reviews';

jest.mock('axios');

const mockReviews = [
  {
    _id: '1',
    user: { email: 'test1@example.com' },
    rating: 5,
    comment: 'Great product!',
  },
  {
    _id: '2',
    user: { email: 'test2@example.com' },
    rating: 4,
    comment: 'Good product.',
  },
];

describe('Reviews', () => {
  it('renders correctly', async () => {
    axios.get.mockResolvedValue({ data: mockReviews });
    const { getByText } = render(<Reviews productId="123" userId="456" />);

    await waitFor(() => {
      expect(getByText('test1@example.com - 5/5')).toBeTruthy();
      expect(getByText('Great product!')).toBeTruthy();
      expect(getByText('test2@example.com - 4/5')).toBeTruthy();
      expect(getByText('Good product.')).toBeTruthy();
    });
  });

  it('submits a new review', async () => {
    axios.get.mockResolvedValue({ data: mockReviews });
    axios.post.mockResolvedValue({ data: 'Review added!' });
    const { getByText, getByPlaceholderText } = render(<Reviews productId="123" userId="456" />);

    fireEvent.changeText(getByPlaceholderText('Comment'), 'Amazing!');
    fireEvent.press(getByText('Submit Review'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/reviews/add', {
        product: '123',
        user: '456',
        rating: 5,
        comment: 'Amazing!',
      });
    });
  });
});
