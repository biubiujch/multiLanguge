declare interface API {
  path: string;
  methods: "get" | "post";
}

declare interface ProjectKeys {
  id: string;
  projectName: string;
  administrator: string;
  administratorID: string;
}

declare interface AdministratorKeys {
  id: string;
  name: string;
  password?: string;
}

declare interface TranslateKeys {
  id: string;
  projectID: string;
  srcText: string;
  dstText: string;
  to: string;
  from: string;
  key: string
}