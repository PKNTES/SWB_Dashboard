import { BaseKey} from "@refinedev/core"

export interface FormFieldProp {
  title: string,
  labelName: string
}

export interface FormValues {
    title: string,
    description: string,
    team: string,
    location: string,
    position: string
    
}

export interface ReportCardProps {
  id?: BaseKey | undefined,
  title: string,
  location: string,
  team: string,
  position: string;
  photo: string,
}
