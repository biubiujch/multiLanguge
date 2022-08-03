declare interface API {
  path: string;
  methods: "get" | "post";
}

declare interface Project {
  id: number;
  projectName: string;
  administrator: string;
}
