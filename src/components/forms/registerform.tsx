import { useEffect } from "react"
import { signupSchema } from "./validators"
import { zodResolver } from "@hookform/resolvers/zod"
import useSignIn from "react-auth-kit/hooks/useSignIn"
import { SignUp, SignUpSchema } from "@/types"
import axios from "axios"
import { decodeToken } from "react-jwt"
import { user$ } from "@/lib/states/userState"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { observable } from "@legendapp/state";
import { observer } from "@legendapp/state/react"
import _ from 'lodash'
import { useMutation, useQuery } from "@tanstack/react-query"
import { enableReactComponents } from "@legendapp/state/config/enableReactComponents"
import { toast } from "sonner"
import SubmitButton from "./SubmitButton"
enableReactComponents()

const state$ = observable({
  province: [{
    id: 0,
    psgcCode: "",
    provDesc: "",
    regCode: "",
    provCode: "",
  }],
  city: [{
    id: 0,
    psgcCode: "",
    citymunDesc: "",
    provCode: "",
    citymunCode: "",
  }],
  baranggay: [{
    id: 0,
    brgyCode: "",
    brgyDesc: "",
    regCode: "",
    provCode: "",
    citymunCode: "",
  }]
})



const RegisterForm = observer(() => {
  const navigate = useNavigate()
  const signIn = useSignIn()
  const province = state$.province.get()
  const city = state$.city.get()
  const brgy = state$.baranggay.get()

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      province: "",
      city: "",
      brgy: "",
    }
  })

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['provinceData'],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_STAGING_BASE_URL}/location/province`)
        .then((res) => res.data),
  })
  if (isPending) {
    return <div>Loading...</div>
  }
  state$.province.set(data.data)

  const getCityByProvinceId = async (provinceId: string) => {
    state$.city.delete()
    try {
      const { data } = await axios
        .get(
          `${import.meta.env.VITE_STAGING_BASE_URL
          }/location/province/${provinceId}/city`
        ).then((res) => res.data)

      state$.city.set(data)
    } catch (error: any) {
      throw new Error(error);
    }
  }

  const getBarangayByCityId = async (cityId: string) => {
    state$.baranggay.delete()
    try {
      const { data } = await axios
        .get(
          `${import.meta.env.VITE_STAGING_BASE_URL
          }/location/city/${cityId}/barangay`
        ).then((res) => res.data)
      state$.baranggay.set(data)
    } catch (error: any) {
      throw new Error(error);
    }
  }

  const onSubmit = async (data: SignUpSchema) => {
    console.log(data)

    try {

      toast.promise(axios.post(`${import.meta.env.VITE_STAGING_BASE_URL}/register`, {
        username: data.username,
        password: data.password,
        provCode: state$.province.get()[0].provCode,
        citymunCode: state$.city.get()[0].citymunCode,
        brgyCode: state$.baranggay.get()[0].brgyCode,
      })
        .then((res) => {
          console.log(res.data)
          res.data
        })
        .catch((error) => {
          toast.error(error.message)
        }), {
          loading: "Loading...",
          success: (data) => {
            navigate("/sign-in")
            return "Successfully registered"
          },
          error: (error) => {
            return error.message
          }
        })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1 sm:gap-2 min-w-64">
            <div className="flex gap-2 w-full flex-col items-stretch sm:flex-row">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex items-start flex-col">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="form-inputs focus-visible:ring-0" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex items-start flex-col">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="form-inputs focus-visible:ring-0" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 flex-row">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex items-start flex-col w-full">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} className="form-inputs focus-visible:ring-0" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 flex-row">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex items-start flex-col w-full">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" className="form-inputs focus-visible:ring-0" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 flex-row">
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem className="flex items-start flex-col w-full">
                    <FormLabel>Province</FormLabel>
                    <Popover  >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {
                              field.value
                                ? _.find(province, (o) => {
                                  return o.provDesc === field.value;
                                })?.provDesc : "Select Province."
                            }
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                        <Command className="w-full">
                          <CommandInput placeholder="Search Province..." />
                          <CommandEmpty>No Province Found.</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {province?.map((provinces) => (
                                <CommandItem
                                  value={provinces.provDesc}
                                  key={provinces.provDesc} // Use a unique identifier, such as province name
                                  onSelect={() => {
                                    form.setValue(
                                      "province",
                                      provinces.provDesc
                                    );
                                    // setProvCode(province.provCode);
                                    form.setValue("city", "")
                                    form.setValue("brgy", "")
                                    getCityByProvinceId(provinces.provCode);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      provinces.provDesc === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {provinces.provDesc}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 flex-row">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="flex items-start flex-col w-full">
                    <FormLabel className="self-start">City</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? _.find(city, (o) => {
                                return o.citymunDesc === field.value;
                              })?.citymunDesc
                              : "Select City."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                        <Command className="w-full">
                          <CommandInput placeholder="Search City..." />
                          <CommandEmpty>No City Found.</CommandEmpty>

                          <CommandGroup>
                            <CommandList>
                              {city?.map((citys) => (

                                <CommandItem
                                  value={citys.citymunDesc}
                                  key={citys.citymunDesc} // Use a unique identifier, such as province name
                                  onSelect={() => {
                                    form.setValue("city", citys.citymunDesc);
                                    form.setValue("brgy", "")


                                    // setCitymunCode(city.citymunCode);
                                    getBarangayByCityId(citys.citymunCode);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      citys.citymunDesc === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {citys.citymunDesc}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 flex-row">
              <FormField
                control={form.control}
                name="brgy"
                render={({ field }) => (
                  <FormItem className="flex items-start flex-col w-full">
                    <FormLabel className="self-start">Barangay</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? brgy?.find(
                                (barangay) =>
                                  barangay.brgyDesc === field.value
                              )?.brgyDesc
                              : "Select City."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                        <Command className="w-full">
                          <CommandInput placeholder="Search City..." />
                          <CommandEmpty>No City Found.</CommandEmpty>

                          <CommandGroup>
                            <CommandList>
                              {brgy?.map((barangay) => (
                                <CommandItem
                                  value={barangay.brgyDesc}
                                  key={barangay.brgyCode} // Use a unique identifier, such as province name
                                  onSelect={() => {
                                    form.setValue(
                                      "brgy",
                                      barangay.brgyDesc
                                    );
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      barangay.brgyDesc === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {barangay.brgyDesc}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
            <SubmitButton title="Register" />
          </div>
        </form>
      </Form>
    </div>
  )
})
export default RegisterForm