import Ajv from "ajv"
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)

const schema = {
    type: "object",
    properties: {
      name: { type: "string" },
      githubOrgs: {
        type: "array",
        items: {
          type: "object",
          properties: {
            url: { type: "string", format: "uri" },
            org: { type: "string" }
          },
          required: ["url", "org"],
          additionalProperties: false
        }
      }
    },
    required: ["name", "githubOrgs"],
    additionalProperties: false
  }



  const validate = ajv.compile(schema)


export function validateProject(project) {
    const valid = validate(project)
    if (!valid) {
      throw new Error(validate.errors.map((error) => error.message).join("\n"))
    }
}

export function validateAllProjects(projects) {
    projects.every((project) => validate(project))
  }