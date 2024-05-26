import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRegistrationByRegistrationFormId } from "../../redux/slice/registrationSlice";
import { getUserById } from "../../redux/slice/authSlice";
import jwtDecode from "jwt-decode";
import { useParams, Link } from "react-router-dom";
import { Backdrop, CircularProgress, Card, Grid, Typography, Avatar, Box, List, ListItem, ListItemIcon, ListItemText, Button, Divider } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import MoneyIcon from '@mui/icons-material/Money';
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import UniversityIcon from '@mui/icons-material/School';

const RegistrationDetail = () => {
  const { registrationFormId } = useParams();
  const dispatch = useDispatch();
  const registration = useSelector(state => state.registration.registrationById);
  const loading = useSelector(state => state.registration.loading);
  const token = useSelector(state => state.auth.token);
  const userId = jwtDecode(token).UserId;
  const userDetail = useSelector(state => state.auth.userById) || {};
  const publicUrl = process.env.PUBLIC_URL + '/';

  useEffect(() => {
    dispatch(getUserById(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    dispatch(getRegistrationByRegistrationFormId(registrationFormId));
  }, [dispatch, registrationFormId]);

  return (
    <div style={{ paddingTop:'40px',paddingBottom:'40px',height:'100%', background: 'linear-gradient(180deg, #a0e9ff, #63a4ff)',}}>
  <Box sx={{ maxWidth: 1600, mx: 'auto', mt: 5, mb: 5, p: 2 }}>
      <Card sx={{ display: 'flex', boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid container>
          <Grid item xs={12} md={4} sx={{ 
         
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            borderRight: '5px solid  #63a4ff'
          }}>
            <Avatar src={userDetail.img} alt="Profile Image" sx={{ width: 150, height: 150, mb: 2, boxShadow: 1 }} />
            <Typography variant="h6" align="center">{userDetail.fullName}</Typography>
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Link to="/students-profile">
                <Button variant="contained">Quay lại</Button>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={8} >
            <Grid item xs={12} md={12} sx={{borderBottom: '5px solid #63a4ff' }}>
            <Grid item xs={12} md={12} sx={{p :3 }}>
            <Typography variant="h4" gutterBottom>Đơn tư vấn</Typography>
            <List>
              <ListItem>
                <ListItemIcon><EmailIcon /></ListItemIcon>
                <ListItemText primary="Email" secondary={userDetail.email} />
              </ListItem>
              <ListItem>
                    <ListItemIcon><LocationOnIcon /></ListItemIcon>
                    <ListItemText primary="Khu vực sinh sống" secondary={registration.area || "chưa có"} />
                  </ListItem>
              <ListItem>
                    <ListItemIcon><MoneyIcon /></ListItemIcon>
                    <ListItemText primary="Tài chính" secondary={registration.budget ? `${registration.budget}$` : "chưa có"} />
                  </ListItem>
             

           
            </List>
            </Grid>
            </Grid>
           <Grid sx={{p : 3}}>
           <Typography variant="h5" gutterBottom>Chi tiết</Typography>
            <Grid container>
              <Grid item xs={12} sm={6} >
                <List>
                  <ListItem>
                    <ListItemIcon><SchoolIcon /></ListItemIcon>
                    <ListItemText primary="Chương trình được chọn" secondary={registration.programChoose} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><BookIcon /></ListItemIcon>
                    <ListItemText primary="Chuyên ngành nguyện vọng" secondary={registration.majorChoose} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><InfoIcon /></ListItemIcon>
                    <ListItemText primary="Thông tin thêm" secondary={registration.moreInformation || "chưa có"} />
                  </ListItem>
                 
                </List>
              </Grid>
              <Grid item xs={12} sm={6}>
                <List>
                  <ListItem>
                    <ListItemIcon><FavoriteIcon /></ListItemIcon>
                    <ListItemText primary="Ưu tiên du học" secondary={registration.priorityOfStudyAbroad || "chưa có"} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><FlightTakeoffIcon /></ListItemIcon>
                    <ListItemText primary="Lý do du học" secondary={registration.studyAbroadReason || "chưa có"} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><UniversityIcon /></ListItemIcon>
                    <ListItemText primary="Lý do chọn trường đại học" secondary={registration.universityChooseReason || "chưa có"} />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
           </Grid>
           
          </Grid>
        </Grid>
      </Card>
    </Box>
    </div>
    
  );
};

export default RegistrationDetail;
