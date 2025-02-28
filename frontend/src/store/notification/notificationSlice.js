import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import notificationService from "./notificationService";



export const getNotificationForUser= createAsyncThunk("notification/getNotificationForUser",async(_,thunkAPI)=>{
    try {
        return await notificationService.getNotificationForUser();
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
})  

export const markNotificationAsRead= createAsyncThunk("notification/markNotificationAsRead",async(id,thunkAPI)=>{
    try {
        return await notificationService.markNotificationAsRead(id);
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
})

export const sendNewBidNotification= createAsyncThunk("notification/sendNewBidNotification",async(data,thunkAPI)=>{
    try {
        return await notificationService.sendNewBidNotification(data);
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
})


export const markAllNotificationsAsRead = createAsyncThunk("notification/markAllNotificationsAsRead",async(_,thunkAPI)=>{
    try {
        return await notificationService.markAllNotificationsAsRead();
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
})

export const sendAuctionWinnerNotification = createAsyncThunk("notification/sendAuctionWinnerNotification", async (data, thunkAPI) => {
    try {
      return await notificationService.sendAuctionWinnerNotification(data);
    } catch (error) {
      const message = (error.response && error.response.data.message) || error.message;
      return thunkAPI.rejectWithValue({ message, isError: true });
    }
  });
  

export const deleteBidAndUpdateWinner = createAsyncThunk(
    "notification/deleteBidAndUpdateWinner",
    async (deletedUserId, thunkAPI) => {
        try {
            return await notificationService.deleteBidAndUpdateWinner(deletedUserId);
        } catch (error) {
            const message = (error.response && error.response.data.message) || error.message;
            return thunkAPI.rejectWithValue({ message, isError: true });
        }
    }
);



const initialState={
    notifications:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:""

}

const notificationSlice = createSlice({
    name:"notification",
    initialState,
    reducers:{
        reset:(state)=>{
            state.isError=false;
            state.isSuccess=false;
            state.isLoading=false;
            state.message="";
        }
        


    },
    extraReducers:(builder) =>{
        builder
        .addCase(getNotificationForUser.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(getNotificationForUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.notifications=action.payload.data;
            state.message="";
        })
        .addCase(getNotificationForUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })
        .addCase(markNotificationAsRead.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(markNotificationAsRead.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.message=action.payload.message;
        })
        .addCase(markNotificationAsRead.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })
        .addCase(sendNewBidNotification.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(sendNewBidNotification.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.message=action.payload.message;
        })
        .addCase(sendNewBidNotification.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })
        .addCase(markAllNotificationsAsRead.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(markAllNotificationsAsRead.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.message=action.payload.message;
        })
        .addCase(markAllNotificationsAsRead.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })
        
        .addCase(deleteBidAndUpdateWinner.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        })
        .addCase(deleteBidAndUpdateWinner.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            
            // Remove deleted user's bid from state
            state.notifications = state.notifications.filter(
                (bid) => bid.user !== action.payload.deletedUserId
            );
        
            // Update the new winner and current bid
            if (action.payload.newWinner && action.payload.newHighestBid) {
                state.winner = action.payload.newWinner;
                state.currentBid = action.payload.newHighestBid;
                state.message = `${action.payload.newWinner} won the bid with ${action.payload.newHighestBid}`;
            } else {
                state.winner = null;
                state.currentBid = 0; // Reset bid if no valid winner
                state.message = "";
            }
        })
        
        
        
        .addCase(deleteBidAndUpdateWinner.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload.message;
        });
        
        
        
    }
})


export const {reset} =notificationSlice.actions;
export default notificationSlice.reducer;