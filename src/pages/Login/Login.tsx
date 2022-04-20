import { Link, Grid, CssBaseline, Paper, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Stack } from "@mui/material";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AuthService from "../../integrations/auth.service";
import './Login.sass';
import Rules from "../../configs/validation.rules";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/actions/auth.actions";
import IAppState, { IAuthState } from "../../store/State";
import { getPushSubscription } from "../../utils/pushNotifications";

export default function Login() {

    // <> Context
    const user: IAuthState = useSelector<IAppState, IAuthState>(state => state?.auth);
    const dispatch = useDispatch();

    // <> State
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // <> Form
    const { handleSubmit, control, formState: { errors } } = useForm();

    // <> Action
    async function onSubmit(data: FieldValues) {

        try {

            // -> Turn Loader ON
            setIsLoading(true);

            // -> Login
            // const loginResponse = await AuthService.login(data.email, data.password);

            // -> Update Store
            // dispatch(setUser(loginResponse.data.user));
            dispatch(setUser({
                id: '1',
                email: data.email
            }));

            // -> Get PN Subscription
            const pnSub: PushSubscription | null = await getPushSubscription();
            console.log(pnSub);

            // -> Navigate to Homepage

        }
        catch(e: unknown) {
            // Global Error Handler
        }
        finally {
            setIsLoading(true);
        }
    }

    // <> JSX
    return (
        <Grid container component="main" sx={{ height: '100vh' }} direction={{ sm: 'column', md: 'row' }}>
            <CssBaseline />

            {/* Left Image */}
            <Grid item xs={false} sm={4} md={7} sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            {/* Right Form Section */}
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Stack
                    className={`form-box`}
                    direction="column"
                    alignItems="center"
                    sx={{
                        mt: {
                            sm: 5,
                            md: 30
                        },
                        px: 10
                    }}
                >

                    {/* Top */}
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    {/* Form */}
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>

                        {/* Email */}
                        <Controller
                            name="email"
                            control={control}
                            rules={Rules.user.email}
                            defaultValue={''}
                            render={({ field }) => (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    autoFocus
                                    error={errors?.email}
                                    helperText={errors?.email?.message}
                                    {...field}
                                />
                            )}
                        />

                        {/* Password */}
                        <Controller
                            name="email"
                            control={control}
                            defaultValue={''}
                            render={({ field }) => (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            )}
                        />

                        {/* Remember Me */}
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>

                        {/* Links */}
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>

                        {user.isLoggedIn ? 'USER LOGGED IN' : 'USER NOT LOGGED IN'}

                    </Box>
                </Stack>
            </Grid>
        </Grid>
    )

}