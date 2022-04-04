import Helmet from "react-helmet"
import TextInput from '@/Shared/TextInput';
import { useForm } from '@inertiajs/inertia-react';
import FlashMessages from "@/Shared/FlashMessages";

export default () => {

    const { data, setData, errors, post } = useForm({
        email: '',
      });
    
      function handleSubmit(e) {
        e.preventDefault();
        post(route('emails.password'));
      }

    return (
        <div className="flex items-center justify-center min-h-screen p-6 bg-indigo-900">
            <Helmet title="Forgot Password"/>

            <div className="w-full absolute top-2">
                <FlashMessages />
            </div>

                <form
                onSubmit={handleSubmit}
                className="mt-8 overflow-hidden bg-white rounded-lg shadow-xl">
                    <div className="px-10 py-12">
                        <h1 className="text-3xl font-bold text-center">Forgot Password</h1>
                        <TextInput
                        className="mt-10"
                        label="Email"
                        name="email"
                        type="email"
                        errors={errors.email}
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        />

                    </div>
                    <div className="flex justify-center">
                        <input 
                        value='Send' 
                        type="submit"
                        className="btn-indigo"
                        />

                    </div>
                </form>
            </div>
    )
}