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
