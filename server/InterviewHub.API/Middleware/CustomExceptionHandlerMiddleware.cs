using System;
using System.Collections.Generic;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using FluentValidation;
using InterviewHub.Application.Common.Exceptions;
using Microsoft.AspNetCore.Http;

namespace BaseProject.API.Middleware
{
    public class CustomExceptionHandlerMiddleware(RequestDelegate next)
    {
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception e)
            {
                await HandleExceptionAsync(context, e);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var error = _exceptionHandlers.TryGetValue(exception.GetType(), out var handler)
                ? handler.Invoke(exception)
                : ExceptionHandle(exception);


            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)error.StatusCode;

            return context.Response.WriteAsync(JsonSerializer.Serialize(error.ErrorDetails ?? string.Empty));
        }


        private readonly Dictionary<Type, Func<Exception, ErrorResponse>> _exceptionHandlers = new()
        {
            {
                typeof(Exception), ExceptionHandle
            },
            {
                typeof(ValidationException), ValidationExceptionHandle
            },
            {
                typeof(NotFoundException), NotFoundExceptionHandle
            },
            {
                typeof(UserExistException), UserExistHandler
            },
        };

        private static ErrorResponse ExceptionHandle(Exception exception)
        {
            return new ErrorResponse(HttpStatusCode.InternalServerError, exception.Message);
        }
        
        private static ErrorResponse UserExistHandler(Exception exception)
        {
            return new ErrorResponse(HttpStatusCode.BadRequest, exception.Message);
        }

        private static ErrorResponse ValidationExceptionHandle(Exception validationException)
        {
            return new ErrorResponse(HttpStatusCode.BadRequest, ((ValidationException)validationException).Errors);
        }

        private static ErrorResponse NotFoundExceptionHandle(Exception exception)
        {
            return new ErrorResponse(HttpStatusCode.NotFound, exception.Message);
        }

        private class ErrorResponse(HttpStatusCode statusCode, object? errorDetails = null)
        {
            public HttpStatusCode StatusCode { get; set; } = statusCode;
            public object? ErrorDetails { get; set; } = errorDetails;
        }
    }
}