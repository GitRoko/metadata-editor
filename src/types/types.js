export const json_typeMapping = {
  "string": "abc",
  "number": "123",
  "object": "{ }",
  "array": "[ ]",
  "boolean": "0/1",
};

export const td_typeMapping = {
  "string": ["varchar"],
  "number": ["bigint","double"],
  "array": ["string","array(varchar)"],
  "boolean": ["varchar"],
  "object": ["varchar"]
};

export const pydantic_typeMapping = {
	"string": ["StrictStr"],
	"number": ["StrictInt","StrictFloat"],
	"array": ["List"],
	"boolean": ["StrictBool"],
	"object": ["Dict"]
};
