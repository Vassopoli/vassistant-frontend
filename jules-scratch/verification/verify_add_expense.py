from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # In a real-world scenario, you would need to log in here.
    # Since this is a local verification, we'll assume we are already logged in
    # and navigate directly to a sample group expenses page.

    # Replace 'test-group-id' with a valid group ID for your test environment
    group_id = 'test-group-123'

    # Navigate to the group expenses page
    page.goto(f"http://localhost:3000/financial/groups/{group_id}")

    # Click the "Add Expense" button
    add_expense_button = page.locator('text="Add Expense"')
    add_expense_button.click()

    # Wait for the new page to load
    page.wait_for_url(f"http://localhost:3000/financial/groups/{group_id}/expenses/new")

    # Verify the heading on the "Add Expense" page
    heading = page.locator(f'h1:has-text("Add Expense to Group {group_id}")')
    assert heading.is_visible()

    # Take a screenshot of the "Add Expense" form
    page.screenshot(path="jules-scratch/verification/add_expense_form.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
