from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()
    page.goto("http://localhost:3000/message")
    page.wait_for_selector('input[type="text"]')
    page.fill('input[type="text"]', "Hello, this is a test message.")
    page.click('button:has-text("Send")')
    page.wait_for_selector('div:has-text("Hello, this is a test message.")')
    page.screenshot(path="jules-scratch/verification/verification.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
