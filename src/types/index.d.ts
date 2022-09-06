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

declare interface SourceKeys {
  id: string;
  key: string;
  from: string;
  content: string;
  projectID: string;
}

declare interface DestinationKeys {
  id: string;
  srcID: string;
  content: string;
  to: string;
}
