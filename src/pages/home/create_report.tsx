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
import { useCallback } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { MappedProvince } from "psgc/dist/PsgcInterface";
const CreateReport = () => {
  const provincesList: MappedProvince[] = provinces.all();
  const form = useForm<CreateReportSchemaType>({
    resolver: zodResolver(CreateReportSchema),
  });

  const getMapData = useCallback((value: any) => {
    if (value) {
      form.setValue("city", value.city);
      form.setValue("province", value.province);
    }

    console.log(municipalities.filter("Metro Manila"));
    console.log(
      "get Barangays",
      value.sublocality,
      barangays.filter("Metro Manila")
    );
  }, []);

  console.log(provincesList);

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
                    <FormLabel>Province</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? provincesList.find(
                                  (province) => province.name === field.value
                                )?.name
                              : "Select Province."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search language..." />
                          <CommandEmpty>Select Province.</CommandEmpty>
                          <CommandGroup>
                            {/* {provincesList.map((province) => (
                              <CommandItem
                                value={province.name}
                                key={province.name} // Use a unique identifier, such as province name
                                onSelect={() => {
                                  form.setValue("province", province.name);
                                }}
                              >
                                {/* <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    province.name === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                /> */}
                            {/* {province.name}
                              </CommandItem> */}
                            {/* ))} */}
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
                  <FormItem className="flex items-start flex-col w-full">
                    <FormLabel>City</FormLabel>
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
                name="barangay"
                render={({ field }) => (
                  <FormItem className="flex items-start flex-col w-full">
                    <FormLabel>Barangay</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="form-inputs focus-visible:ring-0"
                      />
                    </FormControl>
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
