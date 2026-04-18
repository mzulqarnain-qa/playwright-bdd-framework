Feature: TestCase_CheckoutFlow

@ParallelExecution @Checkout
Scenario: Verify complete checkout flow for Sauce Labs Backpack

    # STEP 1: LAND ON INVENTORY PAGE

    Given the user navigates to the 'Inventory' page

    # STEP 2: VERIFY PRODUCT DISPLAY

    Then the user verifies that 'Sauce Labs Backpack' is visible

    # STEP 3: ADD PRODUCT TO CART

    When the user clicks on the 'Add To Cart Backpack Button'

    # STEP 4: VERIFY PRODUCT ADDED TO CART

    Then the user verifies that 'Remove Backpack Button' is visible
    And the user verifies that 'Cart Badge' is visible

    # STEP 5: OPEN CART PAGE

    When the user clicks on the 'Cart Icon'

    # STEP 6: VERIFY CART CONTENTS

    Then the user verifies that 'Your Cart' is visible
    And the user verifies that 'Sauce Labs Backpack Item In Cart' is visible

    # STEP 7: PROCEED TO CHECKOUT

    When the user clicks on the 'Checkout Button'

    # STEP 8: VERIFY CHECKOUT INFO PAGE

    Then the user verifies that 'Checkout Your Information' is visible

    # STEP 9: ENTER USER DETAILS

    When the user enters 'John' in the 'First Name Input'
    And the user enters 'Doe' in the 'Last Name Input'
    And the user enters '12345' in the 'Zip Code Input'

    # STEP 10: CONTINUE TO OVERVIEW

    And the user clicks on the 'Continue Button'

    # STEP 11: VERIFY ORDER OVERVIEW DETAILS

    Then the user verifies that 'Checkout Overview' is visible
    And the user verifies that 'Payment Information' is visible
    And the user verifies that 'Shipping Information' is visible
    And the user verifies that 'Price Total' is visible

    # STEP 12: COMPLETE ORDER

    When the user clicks on the 'Finish Button'

    # STEP 13: VERIFY SUCCESS MESSAGE

    Then the user verifies that 'Thank You Message' is visible

    # STEP 14: RETURN TO PRODUCTS PAGE

    When the user clicks on the 'Back Home Button'
    Then the user verifies that 'Products Page' is visible