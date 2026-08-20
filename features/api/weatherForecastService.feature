Feature: Service for Weather Forecast Integration
As a user 
I want to enter a city or town name 
So that I can receive a ranked list of activities (Skiing, Surfing, Outdoor Sightseeing, Indoor Sightseeing) for the next 7 days, based on weather conditions.


    Scenario: Test my1
        When GET "weatherForecastService" without params and headers
        Then Response from service should contain: 
        """
        {
         "temperature": 22,
         "status": "sunny"
        }
        """


    Scenario: Test my12
        When GET "weatherForecastService" without params and headers
        Then Response from "weatherForecastService" should match the data type
        And Response status should be 200


