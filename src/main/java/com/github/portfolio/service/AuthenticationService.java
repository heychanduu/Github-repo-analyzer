package com.github.portfolio.service;

import com.github.portfolio.dto.AuthRequest;
import com.github.portfolio.dto.AuthResponse;
import com.github.portfolio.dto.RegisterRequest;
import com.github.portfolio.model.Role;
import com.github.portfolio.model.User;
import com.github.portfolio.repository.UserRepository;
import com.github.portfolio.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtUtil jwtUtil;
        private final AuthenticationManager authenticationManager;

        public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil,
                        AuthenticationManager authenticationManager) {
                this.userRepository = userRepository;
                this.passwordEncoder = passwordEncoder;
                this.jwtUtil = jwtUtil;
                this.authenticationManager = authenticationManager;
        }

        public AuthResponse register(RegisterRequest request) {
                var user = new User();
                user.setEmail(request.getEmail());
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                user.setRole(Role.USER);

                userRepository.save(user);
                var jwtToken = jwtUtil.generateToken(user);
                return AuthResponse.builder()
                                .token(jwtToken)
                                .build();
        }

        public AuthResponse authenticate(AuthRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));
                var user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow();
                var jwtToken = jwtUtil.generateToken(user);
                return AuthResponse.builder()
                                .token(jwtToken)
                                .build();
        }
}
