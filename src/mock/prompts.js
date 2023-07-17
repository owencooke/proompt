export const prompts = [
  {
    title: "Python Looping",
    prompt:
      "Write a Python for loop that iterates over the variables x and y and prints their sum:",
    variables: {
      x: 10,
      y: 20,
    },
    categories: ["programming"],
  },
  {
    title: "Sales Email",
    prompt:
      "Compose a sales email introducing our new product. Use the following variables in the email: product_name, discount_percentage, and expiration_date.",
    variables: {
      product_name: "SuperGadget 2000",
      discount_percentage: "15%",
      expiration_date: "2023-08-31",
    },
    categories: ["sales", "marketing"],
  },
  {
    title: "Meeting Agenda",
    prompt:
      "Create an agenda for the upcoming team meeting. Discuss the following topics: project_status, challenges_faced, and future_plans.",
    variables: {
      project_status: "On track",
      challenges_faced: "Resource constraints",
      future_plans: "Expansion to new markets",
    },
    categories: ["administration"],
  },
  {
    title: "JavaScript Function",
    prompt:
      "Write a JavaScript function that takes an array of numbers and returns the sum of all even numbers in the array.",
    variables: {},
    categories: ["programming"],
  },
];
