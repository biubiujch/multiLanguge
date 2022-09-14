declare interface API {
  path: string;
  methods: "get" | "post";
}

declare interface ProjectKeys {
  id: string;
  projectName: string;
  administrator: string;
  administratorID: string;
  srcLang: string;
  dstLang: string;
  state: number;
}

declare interface AdministratorKeys {
  id: string;
  name: string;
  password?: string;
}

declare interface SourceKeys {
  id: string;
  projectID: string;
  key: string;
  text: string;
  from: string;
}

declare interface Targetkeys {
  id: string;
  projectID: string;
  key: string;
  srcID: string;
  to: string;
  text: string;
}
