

import { Column, Entity, Index, PrimaryColumn, ValueTransformer } from "typeorm"

// Define a custom transformer that handles the lowercase transformation
class LowercaseTransformer implements ValueTransformer {
    to(value: string): string {
        return value.toLowerCase();
    }

    from(value: string): string {
        return value;
    }
}

@Entity()
export class Subreddit {
    @PrimaryColumn('text') // collation: "NOCASE" makes the column case insensitive
    name: string

    @Column('text', { nullable: true })
    last_checked: string // ISO 8601

    @Column('integer', { nullable: true })
    subscriber_count: number

    @Column('text', { nullable: true })
    modwiki_category: string

    @Column('text', { nullable: true })
    status: string


    @Column('text', { nullable: true })
    protest_message: string

}