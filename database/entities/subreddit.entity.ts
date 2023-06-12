

import { Column, Entity, PrimaryColumn, ValueTransformer } from "typeorm"

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
    @PrimaryColumn({ collation: "NOCASE" }) // collation: "NOCASE" makes the column case insensitive
    name: string

    @Column({ nullable: true })
    last_checked: string // ISO 8601

    @Column({ nullable: true })
    subscriber_count: number

    @Column({ nullable: true })
    modwiki_category: string

    @Column({ nullable: true })
    status: string


    @Column({ nullable: true })
    protest_message: string

}