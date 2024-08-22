import { z } from "zod";

const inputType = [
  "text",
  "number",
  "select",
  "checkbox",
  "select",
  "radio",
  "date",
];

export const eventSchema = z
  .object({
    eventName: z.string().min(1, {
      message: "O nome do evento deve ter pelo menos 1 caractere.",
      required_error: "O nome do evento é obrigatório.",
    }),
    eventDescription: z
      .string()
      .min(10, {
        message: "A descrição do evento deve ter pelo menos 10 caracteres.",
        required_error: "A descrição do evento é obrigatória.",
      })
      .max(3000, {
        message: "A descrição do evento deve ter no máximo 3000 caracteres.",
      }),

    street: z.string().min(1, {
      message: "A rua deve ter pelo menos 1 caractere.",
      required_error: "A rua é obrigatória.",
    }),
    number: z.coerce.number(),
    neighborhood: z.string().min(1, {
      message: "O bairro deve ter pelo menos 1 caractere.",
      required_error: "O bairro é obrigatório.",
    }),
    localName: z.string().min(1, {
      message: "O nome do local deve ter pelo menos 1 caractere.",
      required_error: "O nome do local é obrigatório.",
    }),
    city: z.string().min(1, {
      message: "A cidade deve ter pelo menos 1 caractere.",
      required_error: "A cidade é obrigatória.",
    }),
    state: z.string().min(2, {
      message: "O estado deve ter pelo menos 2 caracteres.",
      required_error: "O estado é obrigatório.",
    }),
    cep: z.string().regex(/^\d{5}-\d{3}$/, {
      message: "O código postal deve estar no formato 00000-000.",
      required_error: "O código postal é obrigatório.",
    }),
    eventDateStartEnd: z
      .object({
        from: z.date({ message: "Data de início inválida." }),
        to: z.date({ message: "Data de término inválida." }),
      })
      .refine((data) => data.to > data.from, {
        message: "A data de término deve ser após a data de início.",
        path: ["startEndingSelling"],
      }),

    tickets: z.array(
      z.object({
        ticketName: z
          .string()
          .min(2, {
            message: "O nome do ingresso deve ter no mínimo 2 caracteres.",
          })
          .max(50, {
            message: "O nome do ingresso deve ter no máximo 50 caracteres.",
          }),
        ticketPrice: z.coerce
          .number()
          .nonnegative()
          .min(0, { message: "O preço do ingresso não pode ser negativo." }),
        ticketDescription: z
          .string()
          .min(10, {
            message:
              "A descrição do ingresso deve ter no mínimo 10 caracteres.",
          })
          .max(200, {
            message:
              "A descrição do ingresso deve ter no máximo 300 caracteres.",
          }),
        ticketStockAvailable: z.coerce.number().positive().int().min(1, {
          message:
            "A quantidade de ingressos disponíveis deve ser pelo menos 1.",
        }),
        startEndingSelling: z
          .object({
            from: z.date({ message: "Data de início inválida." }),
            to: z.date({ message: "Data de término inválida." }),
          })
          .refine((data) => data.to > data.from, {
            message: "A data de término deve ser após a data de início.",
            path: ["startEndingSelling"],
          }),
        extraFields: z
          .array(
            z.object({
              label: z.string().min(1, "O ID do campo extra é obrigatório."),
              name: z
                .string()
                .min(1, "O nome do campo personalizado é obrigatório."),
              type: z.enum(inputType, {
                required_error: "por favor escolha o tipo do campo",
              }),
              required: z.boolean(),
              selectOptions: z
                .array(z.string())
                .min(1, "Especifique o nome da opção")
                .optional(),

              radioOptions: z.array(z.string()).optional(),

              checkbox: z.boolean().optional().default(false),
            })
          )
          .optional(),
      })
    ),
    tags: z
      .array(
        z.object({
          id: z.string().min(1, "O ID da tag é obrigatório."),
          text: z.string().min(1, "O texto da tag é obrigatório."),
        })
      )
      .min(1, "Pelo menos uma tag é necessária."),
  })
  .superRefine((values, context) => {
    console.log(values);
  });
