import Container from "@/components/Container";
import GoogleMapRender from "@/components/GoogleMapRender";
import {
  CreateReportSchema,
  CreateReportSchemaType,
} from "@/components/forms/validators";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { user$ } from "@/lib/states/userState";
import { BarangyType, CityType, ProvinceType } from "@/types";

const CreateReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [provinceDropdown, setProvinceDropdown] = useState(false);
  const [cityDropdown, setCityDropdown] = useState(false);
  const [brgyDropdown, setBrgyDropdown] = useState(false);
  const user: any = user$.user.get();
  const token = user$.token.get();
  const form = useForm<CreateReportSchemaType>({
    resolver: zodResolver(CreateReportSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      full_address: "",
      province: "",
      city: "",
      barangay: "",
      prov_code: "",
      citymun_code: "",
      brgy_code: "",
    },
  });

  // get province api
  const provinceQuery = useQuery<ProvinceType[]>({
    queryKey: ["provincequery"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_STAGING_BASE_URL}/location/province`)
        .then((res) => {
          return res.data.data;
        }),
  });

  const watchProvCode = form.watch("prov_code");
  const watchCityCode = form.watch("citymun_code");
  // get city api
  const cityQuery = useQuery<CityType[]>({
    queryKey: ["cityquery", watchProvCode],
    queryFn: () =>
      axios
        .get(
          `${
            import.meta.env.VITE_STAGING_BASE_URL
          }/location/province/${form.getValues("prov_code")}/city`
        )
        .then((res) => {
          return res.data.data;
        }),

    enabled: form.getValues("prov_code") ? true : false,
  });

  // get barangay api
  const barangayQuery = useQuery<BarangyType[]>({
    queryKey: ["barangayquery", watchCityCode],
    queryFn: () =>
      axios
        .get(
          `${
            import.meta.env.VITE_STAGING_BASE_URL
          }/location/city/${form.getValues("citymun_code")}/barangay`
        )
        .then((res) => {
          return res.data.data;
        }),

    enabled: form.getValues("citymun_code") ? true : false,
  });

  // get city by province id

  const onSubmit = useCallback((values: CreateReportSchemaType) => {
    if (
      values.title &&
      values.description &&
      values.full_address &&
      values.province &&
      values.city &&
      values.barangay &&
      values.prov_code &&
      values.citymun_code &&
      values.brgy_code
    ) {
      if (user) {
        const body = {
          user_id: user.id,
          description: values.description,
          prov_code: values.prov_code,
          citymun_code: values.citymun_code,
          brgy_code: values.brgy_code,
        };

        try {
          setIsLoading(true);
          toast.loading("Creating report", {
            id: "create-report",
          });
          axios
            .post(
              `${import.meta.env.VITE_STAGING_BASE_URL}/incident-report/create`,
              body,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              toast.success("Report Created Successfully", {
                id: "create-report",
                duration: 2000,
              });
              setIsLoading(false);
              form.reset();
            })
            .catch((error) => {
              toast.error(`error ${error.message}`, {
                id: "create-report",
                duration: 2000,
              });
              setIsLoading(false);
            });
        } catch (error) {
          toast.error("There was an error creating your report", {
            id: "create-report",
            duration: 2000,
          });
          setIsLoading(false);
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      toast.error("please fill up the missing fields", {
        id: "create-report",
        duration: 2000,
      });
    }
  }, []);

  const getMapData = async (value: any) => {
    if (
      !form.getValues("province") &&
      !form.getValues("city") &&
      !form.getValues("barangay")
    ) {
      if (value) {
        const existing = provinceQuery.data?.find(
          (prov) => prov.provDesc === value.province.toUpperCase()
        );
        if (existing) {
          form.setValue("province", existing.provDesc);
          form.setValue("prov_code", existing.provCode);

          while (cityQuery.isLoading) {
            await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100ms
          }
          const existingCity = cityQuery.data?.find(
            (city) => city.citymunDesc === value.city.toUpperCase()
          );

          if (existingCity) {
            form.setValue("city", existingCity.citymunDesc);
            form.setValue("citymun_code", existingCity.citymunCode);
          }
        }
      }
    }
  };

  return (
    <Container title={"Create Report"}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 pb-20 overflow-visible"
        >
          <div className="flex flex-col md:flex-row gap-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex items-start flex-col w-full">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="form-inputs focus-visible:ring-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex items-start flex-col w-full">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          role="combobox"
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal form-inputs focus-visible:ring-0",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex items-start flex-col w-full h-52 md:min-h-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description of the incident"
                      className="resize-none form-inputs focus-visible:ring-0 h-full"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-5 w-full">
              <FormField
                control={form.control}
                name="full_address"
                render={({ field }) => (
                  <FormItem className="flex items-start flex-col w-full">
                    <FormLabel>Full Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        required
                        className="form-inputs focus-visible:ring-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="self-start">Province</FormLabel>
                    <Popover
                      open={provinceDropdown}
                      onOpenChange={setProvinceDropdown}
                    >
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
                              ? provinceQuery.data?.find(
                                  (province) =>
                                    province.provDesc === field.value
                                )?.provDesc
                              : "Select Province."}
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
                              {provinceQuery.data?.map((province) => (
                                <CommandItem
                                  value={province.provDesc}
                                  key={province.provDesc} // Use a unique identifier, such as province name
                                  onSelect={() => {
                                    form.setValue(
                                      "province",
                                      province.provDesc
                                    );
                                    form.setValue("city", "");
                                    form.setValue("barangay", "");
                                    form.setValue(
                                      "prov_code",
                                      province.provCode
                                    );
                                    setProvinceDropdown(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      province.provDesc === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {province.provDesc}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="self-start">City</FormLabel>
                    <Popover open={cityDropdown} onOpenChange={setCityDropdown}>
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
                              ? cityQuery.data?.find(
                                  (city) => city.citymunDesc === field.value
                                )?.citymunDesc
                              : "Select City."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                        <Command className="w-full">
                          <CommandInput placeholder="Search City..." />
                          <CommandEmpty>
                            No City Found. Try selecting province first
                          </CommandEmpty>

                          <CommandGroup>
                            <CommandList>
                              {cityQuery.data?.map((city) => (
                                <CommandItem
                                  value={city.citymunDesc}
                                  key={city.citymunDesc} // Use a unique identifier, such as province name
                                  onSelect={() => {
                                    form.setValue("city", city.citymunDesc);
                                    form.setValue(
                                      "citymun_code",
                                      city.citymunCode
                                    );
                                    setCityDropdown(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      city.citymunDesc === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {city.citymunDesc}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="barangay"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="self-start">Barangay</FormLabel>
                    <Popover open={brgyDropdown} onOpenChange={setBrgyDropdown}>
                      <PopoverTrigger asChild>
                        <FormControl aria-disabled>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? barangayQuery.data?.find(
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
                          <CommandEmpty>
                            No City Found. Try selecting city first
                          </CommandEmpty>

                          <CommandGroup>
                            <CommandList>
                              {barangayQuery.data?.map((barangay) => (
                                <CommandItem
                                  value={barangay.brgyDesc}
                                  key={barangay.brgyCode} // Use a unique identifier, such as province name
                                  onSelect={() => {
                                    form.setValue(
                                      "barangay",
                                      barangay.brgyDesc
                                    );
                                    form.setValue(
                                      "brgy_code",
                                      barangay.brgyCode
                                    );
                                    setBrgyDropdown(false);
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className=" flex h-[350px] lg:h-[400px] w-full">
            <GoogleMapRender getMapData={getMapData} />
          </div>

          <Button
            disabled={isLoading}
            onClick={form.handleSubmit(onSubmit)}
            className={`w-[150px] self-center md:absolute md:right-20 md:top-10 ${
              isLoading && "bg-foreground/50"
            }`}
          >
            Submit Report
          </Button>
        </form>
      </Form>
    </Container>
  );
};

export default CreateReport;
