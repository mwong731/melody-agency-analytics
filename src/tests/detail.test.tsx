import React from 'react';
import { fireEvent, screen, render, act , waitFor} from '@testing-library/react'
import Detail from '../components/Detail';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import imageReducer, {initialState} from '../redux/imagesSlice'


const reduxState = {...initialState, 
  list: [   {
    "id": "74957345-6f5b-4d66-ae9d-5d0071b40279",
    "url": "https://agencyanalytics-api.vercel.app/images/0.jpg",
    "filename": "tennessee_female_rubber.jpg",
    "description": "Laboriosam eligendi inventore officia nemo. Quisquam explicabo voluptatem. Illo laborum facilis.",
    "uploadedBy": "Ms. Jimmie Cole",
    "createdAt": "2017-07-15T08:23:20.462Z",
    "updatedAt": "2022-12-16T12:41:33.736Z",
    "dimensions": {
      "height": 4800,
      "width": 3200
    },
    "resolution": {
      "height": 72,
      "width": 72
    },
    "sizeInBytes": 4812732,
    "sharedWith": [],
    "favorited": true
  }, ],
  chosenImageId: "74957345-6f5b-4d66-ae9d-5d0071b40279",
}

function renderWithProviders(ui: React.ReactElement, ) {
  const store = configureStore({reducer: {
    images: imageReducer
  }, preloadedState: {images: reduxState}
  });
  return render(<Provider store={store}>{ui}</Provider>);
}

describe('Detail component', () => {
  test('Favorited item shows filled heart', async () => {
    renderWithProviders(<Detail/>);

    expect(screen.getByTestId("favorite-true")).toBeTruthy();
    // expect(screen.getByTestId("favorite-false")).not.toBeTruthy();

  })


  test('Click on favorited item changes button to show empty heart', async () => {
    renderWithProviders(<Detail/>);

    fireEvent.click(screen.getByTestId('favorite-button'))
    expect(screen.getByTestId("favorite-false")).toBeTruthy();

  })

  test('Click on delete button removes image from list, causing details to be empty', async () => {
    renderWithProviders(<Detail/>);

    expect(screen.queryByText(/Information/i)).toBeTruthy();
    fireEvent.click(screen.getByTestId('delete-button'))
    expect(screen.queryByText(/Information/i)).not.toBeTruthy();

  })
})