import Container from "@/components/Container";
import GoogleMapRender from "@/components/GoogleMapRender";
import {
  CreateReportSchema,
  CreateReportSchemaType,
} from "@/components/forms/validators";
import { regions, municipalities, barangays, provinces } from "psgc";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { MappedProvince } from "psgc/dist/PsgcInterface";
import axios from "axios";

export interface ProvinceType {
  id: number;
  psgcCode: string;
  provDesc: string;
  regCode: string;
  provCode: string;
}

interface CityType {
  id: number;
  psgcCode: string;
  citymunDesc: string;
  provCode: string;
  citymunCode: string;
}

export interface BarangyType {
  id: number;
  brgyCode: string;
  brgyDesc: string;
  regCode: string;
  provCode: string;
  citymunCode: string;
}

const CreateReport = () => {
  const [provinceState, setProvinceState] = useState<ProvinceType[] | null>(
    null
  );
  const [provCode, setProvCode] = useState<string>("");
  const [citymunCode, setCitymunCode] = useState<string>("");
  const [barangayCode, setBarangayCode] = useState<string>("");
  const [cityState, setCityState] = useState<CityType[] | null>(null);
  const [barangayState, setBarangayState] = useState<BarangyType[] | null>(
    null
  );

  // get provinces
  useEffect(() => {
    async function getProvince() {
      try {
        await await axios
          .get(`${import.meta.env.VITE_STAGING_BASE_URL}/location/province`)
          .then((res) => setProvinceState(res.data.data));
      } catch (error: any) {
        throw new Error(error);
      }
    }

    getProvince();
  }, []);

  // get city by province id
  const getCityByProvinceId = useCallback(
    async (provinceId: string) => {
      try {
        await axios
          .get(
            `${
              import.meta.env.VITE_STAGING_BASE_URL
            }/location/province/${provinceId}/city`
          )
          .then((res) => setCityState(res.data.data));
      } catch (error: any) {
        throw new Error(error);
      }
    },
    [provCode]
  );

  // get city by province id
  const getBarangayByCityId = useCallback(
    async (bgryId: string) => {
      try {
        await axios
          .get(
            `${
              import.meta.env.VITE_STAGING_BASE_URL
            }/location/city/${bgryId}/barangay`
          )
          .then((res) => setBarangayState(res.data.data));
      } catch (error: any) {
        throw new Error(error);
      }

      console.log(cityState);
    },
    [citymunCode]
  );

  const form = useForm<CreateReportSchemaType>({
    resolver: zodResolver(CreateReportSchema),
    defaultValues: {
      city: "",
      province: "",
    },
  });

  const getMapData = useCallback((value: any) => {
    if (value) {
      form.setValue("city", value.city.toUpperCase());
      form.setValue("province", value.province.toUpperCase());
    }

    console.log(value.city);

    if (provinceState) {
      const provinceDetail = provinceState.find(
        (e) => e.provDesc === value.province.toUpperCase()
      );

      if (provinceDetail) getCityByProvinceId(provinceDetail.provCode);
      if (barangayState) {
        console.log("adad");
      }
    }
  }, []);

  return (
    <Container title={"Create Report"}>
      <Form {...form}>
        <form className="flex flex-col gap-5">
          <div className="flex flex-row gap-5">
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
              name="datetime"
              render={({ field }) => (
                <FormItem className="flex items-start flex-col w-full">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
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

          <div className="flex flex-row gap-5">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex items-start flex-col w-full min-h-full">
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
                              ? provinceState?.find(
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
                              {provinceState?.map((province) => (
                                <CommandItem
                                  value={province.provDesc}
                                  key={province.provDesc} // Use a unique identifier, such as province name
                                  onSelect={() => {
                                    form.setValue(
                                      "province",
                                      province.provDesc
                                    );
                                    setProvCode(province.provCode);
                                    getCityByProvinceId(province.provCode);
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
                              ? cityState?.find(
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
                          <CommandEmpty>No City Found.</CommandEmpty>

                          <CommandGroup>
                            <CommandList>
                              {cityState?.map((city) => (
                                <CommandItem
                                  value={city.citymunDesc}
                                  key={city.citymunDesc} // Use a unique identifier, such as province name
                                  onSelect={() => {
                                    form.setValue("city", city.citymunDesc);

                                    setCitymunCode(city.citymunCode);
                                    getBarangayByCityId(city.citymunCode);
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
                              ? barangayState?.find(
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
                              {barangayState?.map((barangay) => (
                                <CommandItem
                                  value={barangay.brgyDesc}
                                  key={barangay.brgyCode} // Use a unique identifier, such as province name
                                  onSelect={() => {
                                    form.setValue(
                                      "barangay",
                                      barangay.brgyDesc
                                    );

                                    setBarangayCode(barangay.brgyCode);
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
        </form>
      </Form>

      <GoogleMapRender getMapData={getMapData} />
    </Container>
  );
};

export default CreateReport;
