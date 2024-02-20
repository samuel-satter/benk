package com.example.benk.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
@EnableWebSecurity
public class SecurityConfig {
    // private UserDetailsService userDetailsService;
    // private final PasswordEncoder passwordEncoder;

    // public SecurityConfig(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
    //     this.userDetailsService = userDetailsService;
    //     this.passwordEncoder = passwordEncoder;
    // }

    // @Bean
    // public static PasswordEncoder passwordEncoder() {
    //     return new BCryptPasswordEncoder();
    // }

    // @Autowired
    // public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    //     auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    // }

    // @Bean
    // public AuthenticationManager authenticationManager() throws Exception {
    //     return new ProviderManager(authenticationProvider());
    // }

    // @Bean
    // public AuthenticationProvider authenticationProvider() {
    //     DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
    //     provider.setUserDetailsService(userDetailsService);
    //     provider.setPasswordEncoder(passwordEncoder);
    //     return provider;
    // }


//    @Bean
//    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
//        httpSecurity.csrf((httpSecurityCsrfConfigurer -> {
//            try {
//                httpSecurityCsrfConfigurer.disable()
//                        .csrf(AbstractHttpConfigurer::disable)
//                        .authorizeHttpRequests((authorize) ->
//                                authorize.requestMatchers(HttpMethod.GET, "/api/**").permitAll()
//                                        .requestMatchers("/api/auth/**").permitAll()
//                                        .requestMatchers(HttpMethod.POST,"/jwt/**").permitAll()
//                                        .anyRequest().authenticated());
//            } catch (Exception e) {
//                throw new RuntimeException(e);
//            }
//        }));
//        return httpSecurity.build();
//    }
     @Bean
     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
         http.authorizeHttpRequests(authorizeRequests ->
                     authorizeRequests.anyRequest().permitAll())
             .csrf(AbstractHttpConfigurer::disable);

     return http.build();
     }
}
