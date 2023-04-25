import {Color} from '@/lib/types';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';

export default function Color(props: { color: Color }) {
  return (
    <Card>
      <CardHeader>
        <div className={"mb-3 h-32 rounded-lg"} style={{
          backgroundColor: props.color.background,
        }}></div>
        <CardTitle>{props.color.name} ({props.color.background})</CardTitle>
        <CardDescription>{props.color.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className={"text-lg font-semibold"}>Usages:</p>
        <ul className={"list-inside list-disc"}>
          {props.color.usage.map(usage => {
            return (
              <li>{usage}</li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
