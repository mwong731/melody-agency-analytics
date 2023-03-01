import {store} from '../redux/store'
import imagesSlice, { fetchImages, initialState } from '../redux/imagesSlice'

describe('Games redux state tests', () => {
  it('Should initially set list as an empty array', () => {
    const state = store.getState().images
    expect(state.list).toEqual([])
    expect(state.initialized).toEqual(false)
  })


  it('updates state when fetchImages is fulfilled', () => {
    const action = { type: fetchImages.fulfilled.type, payload: [{id: "2", createdAt:"2017-07-15T08:23:20.462Z"}, {id:"3", createdAt:"2015-09-21T05:49:02.644Z"}] };
    const state = imagesSlice(initialState, action);
    expect(state).toEqual({ 
        list: [{
            id:"3",
            createdAt:"2015-09-21T05:49:02.644Z"
        },
        {
            id: "2",
            createdAt:"2017-07-15T08:23:20.462Z"
        }, ],
        chosenImageId: "3",
        initialized: true,
        error: "", 
        isDetailMode: false
    });
  });

  it('sets error true when fetchImages is rejected', () => {
    const action = { type: fetchImages.rejected.type, payload: { error: 'some error' } };
    const state = imagesSlice(initialState, action);
    expect(state).toEqual({ 
        list: [],
        chosenImageId: "",
        initialized: false,
        error: "Fetch image failed. Please reload page.", 
        isDetailMode: false
    });
  });
})