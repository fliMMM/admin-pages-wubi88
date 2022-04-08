import React from "react";
import {
  Input,
  FormControl,
  InputLabel,
  Button,
  Paper,
  Grid,
  Typography,
  FormHelperText,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Login, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  username: yup.string().required("Bạn chưa nhập tài khoản!"),
  email: yup
    .string()
    .email("Email không đúng định dạng!")
    .required("Bạn chưa nhập email!"),
  password: yup
    .string()
    .min(8, "Mật khẩu tối thiểu 8 kí tự")
    .required("Bạn chưa điền mật khẩu"),
  confirmPassword: yup
    .string()
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Không khớp với mật khẩu"),
    })
    .min(8, "Mật khẩu tối thiểu 8 ký tự")
    .required("Bạn chưa điền mật khẩu xác nhận!"),
});
function RegisterForm() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Grid container paddingTop={"50px"} justify="center" alignContent="center" marginBottom={"-155px"}>
      <Grid
        item
        xs={8}
        md={4}
        style={{
          margin: "50px auto",
        }}
      >
        <Paper
          elevation={4}
          style={{ padding: "20px 15px", marginTop: "30px" }}
        >
          <Typography
            textAlign={"center"}
            height={"30px"}
            variant="h5"
            gutterBottom
          >
            Đăng Ký
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Tên đăng nhập</InputLabel>
              <Input
                name="username"
                fullWidth
                id="username"
                error={
                  formik.touched?.username && Boolean(formik.errors?.username)
                }
                onChange={formik.handleChange}
              />
              <FormHelperText error id="username">
                {formik.touched.username && formik.errors.username}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Email</InputLabel>
              <Input
                name="email"
                fullWidth
                id="email"
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
              <FormHelperText error id="email">
                {formik.touched.email && formik.errors.email}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Địa chỉ</InputLabel>
              <Input
                name="address"
                fullWidth
                id="address"
                onChange={formik.handleChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Mật khẩu</InputLabel>
              <Input
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              />
              <FormHelperText error id="password">
                {formik.touched.password && formik.errors.password}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Nhập lại mật khẩu</InputLabel>
              <Input
                fullWidth
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {!showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
              />
              <FormHelperText error id="confirmPassword">
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Button
                style={{ backgroundColor: "#d1cbcb", margin : "0 auto" }}
                variant="extendedFab"
                type="submit"
                startIcon={
                  loading ? (
                    <CircularProgress size={16} style={{ color: '#fff' }} />
                  ) : (
                    <Login />
                  )
                }
              >
                Đăng kí
              </Button>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default RegisterForm;
