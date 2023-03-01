import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"

export interface imageObject{
    id: string,
    url: string,
    filename: string,
    description: string,
    uploadedBy: string,
    createdAt: string,
    updatedAt: string,
    dimensions: {
      height: number,
      width: number
    },
    resolution: {
      height: number,
      width: number
    },
    sizeInBytes: number,
    sharedWith: string[],
    favorited: boolean
}

interface imagesState {
  list: imageObject[],
  chosenImageId: string,
  initialized: boolean,
  error: string, 
  isDetailMode: boolean
}

export const initialState: imagesState = {
  list: [],
  chosenImageId: "",
  initialized: false,
  error: "",
  isDetailMode: false
}

//Async function to fetch images from API
export const fetchImages = createAsyncThunk("images/fetch", async(thunkAPI) => {
  const response = await fetch("https://agencyanalytics-api.vercel.app/images.json",{
    method: "GET"
  })
  const data = response.json();
  return data;

})

export const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    chooseImage: (state, action: PayloadAction<string>) => {
      state.chosenImageId = action.payload;
      //Open detail mode in mobile
      state.isDetailMode = true;
    },
    favoriteImage: (state, action: PayloadAction<string>) => {
      state.list = state.list.map((image)=>{
        if(image.id === action.payload){
          image.favorited = !image.favorited;
        }
        return image
      })
    },
    deleteImage: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((image, index)=> {
        if(image.id === action.payload){
          //If only one image is left in list, no image can be chosen
          if(state.list.length === 1) {
            state.chosenImageId = "";
          }else{
             //If this is the last item in list, choose previous image, else choose next image
             state.chosenImageId = index === state.list.length - 1 ? state.list[index - 1].id : state.list[index + 1].id;
          }
          
         
        }

        //Close detail mode in mobile
        state.isDetailMode = false;
        
        return image.id !== action.payload
      })
    },
    leaveDetailMode: (state) => {
      state.isDetailMode = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      if(action.payload.length > 0) {
        state.list = action.payload.sort((a:imageObject, b:imageObject)=> new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        state.chosenImageId = state.list[0].id
      }
      state.initialized = true
    })
    .addCase(fetchImages.rejected, (state, action) => {
      state.error = "Fetch image failed. Please reload page."
    })
  },
})

export const { chooseImage, favoriteImage, deleteImage, leaveDetailMode } = imagesSlice.actions

export default imagesSlice.reducer