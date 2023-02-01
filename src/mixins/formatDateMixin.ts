import dayjs from "dayjs";
export default {
  methods: {
    formatDate(dateString: string) {
      const date = dayjs(dateString);
      // Then specify how you want your dates to be formatted
      return date.format("dddd MMMM D, YYYY");
    },
  },
};
