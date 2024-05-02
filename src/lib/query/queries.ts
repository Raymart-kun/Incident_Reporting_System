import axios from "axios"

export const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_STAGING_BASE_URL}${queryKey[0]}`,
  )
  return data
}
