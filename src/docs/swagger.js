import swaggerJSDoc from "swagger-jsdoc";

const storyIdParameter = {
  name: "storyId",
  in: "path",
  required: true,
  description: "MongoDB ObjectId of the story",
  schema: { type: "string", pattern: "^[a-fA-F0-9]{24}$" },
};

const paginationParameters = [
  {
    name: "page",
    in: "query",
    schema: { type: "integer", minimum: 1, default: 1 },
  },
  {
    name: "perPage",
    in: "query",
    schema: { type: "integer", minimum: 1, maximum: 30, default: 10 },
  },
];

const recommendationPaginationParameters = [
  paginationParameters[0],
  {
    name: "perPage",
    in: "query",
    schema: { type: "integer", minimum: 1, maximum: 3, default: 3 },
  },
];

const storyFormProperties = {
  title: { type: "string", minLength: 2, maxLength: 40 },
  category: { type: "string", pattern: "^[a-fA-F0-9]{24}$" },
  article: { type: "string", minLength: 12, maxLength: 3000 },
};

const security = [{ sessionIdCookie: [], accessTokenCookie: [] }];

const definition = {
  openapi: "3.0.3",
  info: {
    title: "Travel Ukraine API",
    version: "1.0.0",
    description:
      "API contract for authentication, travellers, categories and stories.",
  },
  servers: [{ url: "/", description: "Current server" }],
  tags: [
    { name: "Auth" },
    { name: "Users" },
    { name: "Categories" },
    { name: "Stories" },
  ],
  components: {
    securitySchemes: {
      sessionIdCookie: {
        type: "apiKey",
        in: "cookie",
        name: "sessionId",
      },
      accessTokenCookie: {
        type: "apiKey",
        in: "cookie",
        name: "accessToken",
      },
    },
    schemas: {
      Error: {
        type: "object",
        required: ["status", "message"],
        properties: {
          status: { type: "integer", example: 400 },
          message: { type: "string" },
        },
      },
      Category: {
        type: "object",
        properties: {
          _id: { type: "string", example: "507f1f77bcf86cd799439011" },
          category: { type: "string", example: "Маршрути" },
        },
      },
      UserSummary: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          avatarUrl: { type: "string", format: "uri" },
        },
      },
      Story: {
        type: "object",
        properties: {
          _id: { type: "string" },
          img: { type: "string", format: "uri" },
          title: { type: "string" },
          desc: { type: "string" },
          article: { type: "string" },
          category: {
            oneOf: [
              { type: "string" },
              { $ref: "#/components/schemas/Category" },
            ],
          },
          rate: { type: "integer", minimum: 0 },
          ownerId: {
            oneOf: [
              { type: "string" },
              { $ref: "#/components/schemas/UserSummary" },
            ],
          },
          date: { type: "string", format: "date-time" },
          author: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Pagination: {
        type: "object",
        properties: {
          page: { type: "integer" },
          perPage: { type: "integer" },
          totalItems: { type: "integer" },
          totalPages: { type: "integer" },
          hasNextPage: { type: "boolean" },
          hasPreviousPage: { type: "boolean" },
        },
      },
      Credentials: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", format: "password" },
        },
      },
    },
    responses: {
      BadRequest: {
        description: "Invalid request",
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/Error" } },
        },
      },
      Unauthorized: {
        description: "Authentication is required",
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/Error" } },
        },
      },
      NotFound: {
        description: "Resource not found",
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/Error" } },
        },
      },
    },
  },
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/Credentials" },
                  {
                    type: "object",
                    required: ["name"],
                    properties: { name: { type: "string" } },
                  },
                ],
              },
            },
          },
        },
        responses: { 201: { description: "User registered" }, 400: { $ref: "#/components/responses/BadRequest" } },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Log in and set session cookies",
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Credentials" } },
          },
        },
        responses: { 200: { description: "Logged in" }, 401: { $ref: "#/components/responses/Unauthorized" } },
      },
    },
    "/api/auth/refresh": {
      post: {
        tags: ["Auth"],
        summary: "Refresh the current session",
        responses: { 200: { description: "Session refreshed" }, 401: { $ref: "#/components/responses/Unauthorized" } },
      },
    },
    "/api/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Log out the current user",
        security,
        responses: { 204: { description: "Logged out" }, 401: { $ref: "#/components/responses/Unauthorized" } },
      },
    },
    "/api/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Get the current authenticated user",
        security,
        responses: {
          200: { description: "Current user" },
          401: { $ref: "#/components/responses/Unauthorized" },
        },
      },
    },
    "/api/auth/session": {
      get: {
        tags: ["Auth"],
        summary: "Check the current session",
        security,
        responses: {
          200: { description: "Session is valid" },
          401: { $ref: "#/components/responses/Unauthorized" },
        },
      },
    },
    "/api/auth/popular": {
      get: {
        tags: ["Stories"],
        summary: "Get popular stories",
        parameters: paginationParameters,
        responses: { 200: { description: "Popular story list" } },
      },
    },
    "/api/categories": {
      get: {
        tags: ["Categories"],
        summary: "Get all story categories",
        responses: {
          200: {
            description: "Category list",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Category" } },
              },
            },
          },
        },
      },
    },
    "/api/stories": {
      get: {
        tags: ["Stories"],
        summary: "Get stories with category filtering and pagination",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", minimum: 1, default: 1 } },
          { name: "perPage", in: "query", schema: { type: "integer", minimum: 5, maximum: 30, default: 10 } },
          { name: "category", in: "query", schema: { type: "string" } },
          { name: "type", in: "query", schema: { type: "string", enum: ["popular"] } },
        ],
        responses: { 200: { description: "Story list" }, 400: { $ref: "#/components/responses/BadRequest" } },
      },
      post: {
        tags: ["Stories"],
        summary: "Create a story for the authenticated user",
        description: "Uploads one image to Cloudinary. The image must not exceed 1 MB.",
        security,
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                oneOf: [
                  {
                    type: "object",
                    required: ["img", "title", "category", "article"],
                    properties: {
                      img: { type: "string", format: "binary" },
                      ...storyFormProperties,
                    },
                  },
                  {
                    type: "object",
                    required: ["image", "title", "category", "article"],
                    properties: {
                      image: {
                        type: "string",
                        format: "binary",
                        deprecated: true,
                        description:
                          "Compatibility alias used by the current frontend; prefer img.",
                      },
                      ...storyFormProperties,
                    },
                  },
                ],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Story created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "integer", example: 201 },
                    message: { type: "string" },
                    data: { $ref: "#/components/schemas/Story" },
                  },
                },
              },
            },
          },
          400: { $ref: "#/components/responses/BadRequest" },
          401: { $ref: "#/components/responses/Unauthorized" },
          404: { $ref: "#/components/responses/NotFound" },
        },
      },
    },
    "/api/stories/{storyId}": {
      get: {
        tags: ["Stories"],
        summary: "Get detailed story information",
        parameters: [storyIdParameter],
        responses: { 200: { description: "Story details" }, 404: { $ref: "#/components/responses/NotFound" } },
      },
    },
    "/api/stories/{storyId}/recommendations": {
      get: {
        tags: ["Stories"],
        summary: "Get recommended stories",
        description:
          "Returns stories in the source story's category, ordered by how many users saved them.",
        parameters: [storyIdParameter, ...recommendationPaginationParameters],
        responses: {
          200: {
            description: "Paginated recommendations",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "integer", example: 200 },
                    message: { type: "string" },
                    data: { type: "array", items: { $ref: "#/components/schemas/Story" } },
                    pagination: { $ref: "#/components/schemas/Pagination" },
                  },
                },
              },
            },
          },
          400: { $ref: "#/components/responses/BadRequest" },
          404: { $ref: "#/components/responses/NotFound" },
        },
      },
    },
    "/api/stories/{storyId}/favorite": {
      post: {
        tags: ["Stories"],
        summary: "Add a story to the current user's saved stories",
        security,
        parameters: [storyIdParameter],
        responses: { 200: { description: "Story saved" }, 401: { $ref: "#/components/responses/Unauthorized" }, 404: { $ref: "#/components/responses/NotFound" } },
      },
      delete: {
        tags: ["Stories"],
        summary: "Remove a story from the current user's saved stories",
        security,
        parameters: [storyIdParameter],
        responses: { 200: { description: "Story removed" }, 401: { $ref: "#/components/responses/Unauthorized" }, 404: { $ref: "#/components/responses/NotFound" } },
      },
    },
    "/api/users": {
      get: {
        tags: ["Users"],
        summary: "Get travellers",
        responses: { 200: { description: "Traveller list" } },
      },
    },
    "/api/users/me": {
      get: {
        tags: ["Users"],
        summary: "Get the current user",
        security,
        responses: { 200: { description: "Current user" }, 401: { $ref: "#/components/responses/Unauthorized" } },
      },
      patch: {
        tags: ["Users"],
        summary: "Update the current user's profile",
        security,
        responses: { 200: { description: "Profile updated" }, 401: { $ref: "#/components/responses/Unauthorized" } },
      },
    },
    "/api/users/me/stories": {
      get: {
        tags: ["Users"],
        summary: "Get the current user's stories",
        security,
        parameters: paginationParameters,
        responses: { 200: { description: "Story list" }, 401: { $ref: "#/components/responses/Unauthorized" } },
      },
    },
    "/api/users/me/saved-stories": {
      get: {
        tags: ["Users"],
        summary: "Get the current user's saved stories",
        security,
        parameters: paginationParameters,
        responses: { 200: { description: "Saved story list" }, 401: { $ref: "#/components/responses/Unauthorized" } },
      },
    },
    "/api/users/me/avatar": {
      patch: {
        tags: ["Users"],
        summary: "Update the current user's avatar",
        security,
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["avatar"],
                properties: {
                  avatar: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Avatar updated" },
          401: { $ref: "#/components/responses/Unauthorized" },
        },
      },
    },
    "/api/users/me/password": {
      patch: {
        tags: ["Users"],
        summary: "Update the current user's password",
        security,
        responses: {
          200: { description: "Password updated" },
          401: { $ref: "#/components/responses/Unauthorized" },
        },
      },
    },
    "/api/users/confirm-email": {
      post: {
        tags: ["Users"],
        summary: "Confirm an email change",
        responses: {
          200: { description: "Email confirmed" },
          400: { $ref: "#/components/responses/BadRequest" },
        },
      },
    },
    "/api/users/{travellerId}": {
      get: {
        tags: ["Users"],
        summary: "Get a traveller and their published stories",
        parameters: [
          { name: "travellerId", in: "path", required: true, schema: { type: "string", pattern: "^[a-fA-F0-9]{24}$" } },
          ...paginationParameters,
        ],
        responses: { 200: { description: "Traveller profile" }, 404: { $ref: "#/components/responses/NotFound" } },
      },
    },
    "/api/users/saved-stories/{storyId}": {
      post: {
        tags: ["Users"],
        summary: "Add a story to saved stories",
        security,
        parameters: [storyIdParameter],
        responses: { 200: { description: "Story saved" } },
      },
      delete: {
        tags: ["Users"],
        summary: "Remove a story from saved stories",
        security,
        parameters: [storyIdParameter],
        responses: { 200: { description: "Story removed" } },
      },
    },
  },
};

export const swaggerSpec = swaggerJSDoc({ definition, apis: [] });
