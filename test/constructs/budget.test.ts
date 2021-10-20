import { App, Stack } from "@aws-cdk/core";
import { Budget } from "../../lib/constructs/budget";
import { expect, haveResourceLike } from "@aws-cdk/assert";

test('Budget Construct', () => {
    const app = new App();

    const stack = new Stack(app, 'Stack');

    new Budget(stack, 'Budget', {
        budgetAmount: 10,
        emailAddress: 'test@test.com'
    });

    expect(stack).to(
        haveResourceLike('AWS::Budgets::Budget', {
            Budget: {
                BudgetLimit: {
                    Amount: 1
                },
            },
            notificationsWithSubscribers: [
                {
                    Subscribers: [
                        {
                            Address: 'test@example.com'
                        }
                    ]
                }
            ]
        })
    )

})
