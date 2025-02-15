"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast"
import { ChangeEvent, useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import Link from "next/link";
import { Loader2, ClipboardCopy, ClipboardPaste } from "lucide-react";


const FormSchema = z.object({
  profile_photo: z.string(),
  username: z.string().min(2, "Tên đăng nhập phải có ít nhất 2 ký tự").max(30, "Tên đăng nhập không được vượt quá 30 ký tự"),
  password: z.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .regex(/\d/, "Mật khẩu phải chứa ít nhất một số")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"),
  confirm: z.string().nonempty("Không được để trống trường này"),
  Phone: z.string().nonempty("Không được để trống trường này").regex(/^\d{10,11}$/, "Số điện thoại phải có 10 hoặc 11 chữ số"),
  email: z.string().email("Địa chỉ email không hợp lệ").nonempty("Địa chỉ email là bắt buộc"),
  dob: z.string().nonempty("Không được để trống trường này").refine(val => !isNaN(Date.parse(val)), "Ngày sinh phải là một ngày hợp lệ"),
  hometown: z.string().nonempty("Không được để trống trường này"),
}).refine((data) => data.password === data.confirm, {
  message: "Mật khẩu không khớp",
  path: ["confirm"],
}).refine((data) => new Date(data.dob) <= new Date(), {
  message: "Ngày sinh không thể trong tương lai",
  path: ["dob"],
});
const Page = () => {
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const { toast } = useToast()
  const { status: sessionStatus } = useSession();
  const { startUpload } = useUploadThing("media");
  const [files, setFiles] = useState<File[]>([]);
  const [copiedData, setCopiedData] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  useEffect(() => {
    const handlePasteEvent = async (event: ClipboardEvent) => {
      const clipboardData = event.clipboardData?.getData("text");
      if (clipboardData) {
        const parsedData = JSON.parse(clipboardData);
        form.reset(parsedData);
        toast({
          title: "Đã dán",
          description: "Dữ liệu biểu mẫu đã được dán",
        });
      }
    };

    document.addEventListener("paste", handlePasteEvent);
    return () => {
      document.removeEventListener("paste", handlePasteEvent);
    };
  }, [toast]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      profile_photo: "",
      username: "",
      password: "",
      Phone: "",
      email: "",
      dob: "",
      hometown: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const blob = data.profile_photo;
    setloading(true)
    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);
      if (imgRes && imgRes[0].url) {
        data.profile_photo = imgRes[0].url;
      }
    }
    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      })
      alert(res.status)
      if (res.status === 400) {
        const resData = await res.json();
        toast({
          title: "Lỗi Đăng Ký Hãy Nhập Lại",
          description: resData.message,
        })
        setloading(false)
      } else if (res.status === 200) {
        toast({
          title: "Đã Tạo Tài Khoản",
          description: "Bạn Đã Đăng Ký Thành Công Tài Khoản",
        })

        router.push("/login")
      }
    } catch (err) {
      console.log(err);
    }
  }
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const handleCopy = () => {
    const formData = form.getValues();
    setCopiedData(JSON.stringify(formData));
    navigator.clipboard.writeText(JSON.stringify(formData));
    toast({
      title: "Đã sao chép",
      description: "Dữ liệu biểu mẫu đã được sao chép vào clipboard",
    });
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      const parsedData = JSON.parse(clipboardText);
      form.reset(parsedData);
      toast({
        title: "Đã dán",
        description: "Dữ liệu biểu mẫu đã được dán",
      });
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  return (
    <main className='relative mx-auto flex max-w-5xl w-1/2 flex-col justify-center px-10 py-20 bg-black rounded-lg border border-white'>
      <button onClick={handleCopy} className="absolute top-4 right-4 p-2 rounded hover:bg-slate-900">
        <ClipboardCopy className="w-5 h-5" />
      </button>
      <h1 className='head-text text-2xl'>Đăng Ký</h1>
      <section className='mt-9 bg-dark-2 p-10 rounded-md'>
        <Form  {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col justify-center gap-10'>
            {/* Username field */}
            <FormField control={form.control} name="username" render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base-semibold text-light-2'>Tên Đăng Nhập</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên đăng nhập" {...field} />
                </FormControl>
                <FormDescription>Đây là tên hiển thị công khai của bạn.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            {/* Password field */}
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base-semibold text-light-2'>Mật Khẩu</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Nhập mật khẩu" {...field} />
                </FormControl>
                <FormDescription>Chọn một mật khẩu mạnh đáp ứng các yêu cầu.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            {/* confirm Password field */}
            <FormField control={form.control} name="confirm" render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base-semibold text-light-2'>Xác Nhận Mật Khẩu</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Xác nhận mật khẩu" {...field} />
                </FormControl>
                <FormDescription>Vui lòng nhập lại mật khẩu của bạn.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            {/* Full name field */}
            <FormField control={form.control} name="Phone" render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base-semibold text-light-2'>Số Điện Thoại</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập số điện thoại của bạn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            {/* Date of birth field */}
            <FormField control={form.control} name="dob" render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base-semibold text-light-2'>Ngày Sinh</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="Chọn ngày sinh" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            {/* Full name field */}
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base-semibold text-light-2'>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập email của bạn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            {/* Hometown field */}
            <FormField control={form.control} name="hometown" render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base-semibold text-light-2'>Địa Chỉ</FormLabel>
                <FormControl>
                  {/* Replace with your implementation for hometown input (e.g., Input, Select) */}
                  <Input placeholder="Nhập địa chỉ của bạn" {...field} />
                </FormControl>
                <FormDescription>Nơi bạn sinh ra.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            {/* Submit button */}
            {loading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang Xử Lý
              </Button>) : (<Button type="submit" className="hover:bg-zinc-700">Đăng Ký</Button>)}

            <FormDescription>
              Bạn Đã Có Tài Khoản
              <Link href={`/login`} className='w-fit'>
                <span className="text-cyan-400 hover:text-cyan-700"> Đăng Nhập </span>
              </Link>
            </FormDescription>
          </form>
        </Form>
        <button onClick={handlePaste} className="absolute bottom-4 left-4 p-2 rounded hover:bg-slate-900">
          <ClipboardPaste className="w-5 h-5" />
        </button>
      </section>
    </main>
  )
}
export default Page;
