"use client"
import {Input} from "@nextui-org/input";
import {EnvelopeClosedIcon, EyeClosedIcon, EyeOpenIcon, LockClosedIcon} from "@radix-ui/react-icons";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Button} from "@nextui-org/button";
import {Link} from "@nextui-org/link";
import {useState} from "react";
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const validate = () => {
        let formErrors = { email: '', password: ''};

        if (!email)
            formErrors.email = "Email is required"
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            formErrors.email = "Invalid email format";

        if (!password) formErrors.password = "Password is required";

        setErrors(formErrors);
        return Object.values(formErrors).every(error => error === '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);
            setMessage('');

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                })

                const data = await response.json();

                if (!response.ok) {
                    setMessage(data.message || 'Invalid credentials');
                    return;
                }

                setMessage('Login successful!');
                setTimeout(() => router.push('/'), 1000);
            } catch (error) {
                setMessage(error.message);
                console.error('Registration error:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="flex flex-col gap-4 items-center min-h-screen mt-16">
            <Card className="w-full max-w-md p-4">
                <CardHeader className="text-center">
                    <h1 className="text-3xl font-semibold">Login</h1>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardBody className="space-y-8">
                        {message && (
                            <div className={`text-center p-3 rounded-lg ${
                                message.includes('successful')
                                    ? 'bg-success-50 text-success-600'
                                    : 'bg-danger-50 text-danger-600'
                            }`}>
                                {message}
                            </div>
                        )}
                        <Input
                            type="text"
                            label="Email"
                            placeholder="Type your email"
                            labelPlacement="outside"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            startContent={
                                <EnvelopeClosedIcon/>
                            }
                            isInvalid={!!errors.email}
                            errorMessage={errors.email}
                            autoComplete="email"
                        />
                        <Input
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            placeholder="Type your password"
                            labelPlacement="outside"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            startContent={
                                <LockClosedIcon/>
                            }
                            endContent={
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-2xl text-default-400 flex-shrink-0 focus:outline-none"
                                >
                                    {showPassword ? <EyeClosedIcon className="h-6 w-6"/> : <EyeOpenIcon className="h-6 w-6"/>}
                                </button>
                            }
                            isInvalid={!!errors.password}
                            errorMessage={errors.password}
                            autoComplete="current-password"
                        />
                        <Button type="submit" isLoading={isLoading} disabled={isLoading}>
                            Login
                        </Button>
                    </CardBody>
                </form>
                <CardFooter className="flex justify-center gap-1">
                    <p>Don't have an account?</p>
                    <Link href="/register" color="primary">Register</Link>
                </CardFooter>
            </Card>
        </div>
    );
}
