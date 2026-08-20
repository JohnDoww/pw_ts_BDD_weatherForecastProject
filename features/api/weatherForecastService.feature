Feature: Service weatherForecastService
As a user 
I want to enter a city or town name 
So that I can receive a ranked list of activities (Skiing, Surfing, Outdoor Sightseeing, Indoor, Sightseeing) for the next 7 days, based on weather conditions.


        
    Scenario: GET request without params return 400 SC 
        When GET "weatherForecastService" without params and headers
        Then Response status should be 400

    Scenario Outline: GET response has the right structure when sending <boundary> length city name
      When GET "weatherForecastService" with "name=<city_name>" params
      Then Response from "weatherForecastService" should match the data type
      And Response status should be 200
    Examples:
    | boundary | city_name           |
    | MIN      | kyiv                |
    | MAX      | longAllowedNameHEre |