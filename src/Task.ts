import { Entity, Field, UuidField } from "remult";
@Entity("tasks", {
  allowApiCrud: true
})
export class Task {
  @UuidField()
  id: string = "";

  @Field()
  title: string = "";

  @Field()
  completed: boolean = false;
}
